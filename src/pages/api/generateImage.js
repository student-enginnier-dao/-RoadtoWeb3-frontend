import * as playwright from "playwright-aws-lambda";
import ReactDOM from "react-dom/server";

const styles = (props) => `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Yusei+Magic&display=swap');
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  html, body {
    height: 100%;
    overflow: hidden;
    font-family: 'Anton','Yusei Magic', cursive;
  }

  .wrapper{
    background-image:${props.bg};
    width:100%;
    height:100%;
    border-radius: 1rem;
    overflow: hidden;
    display:flex;
    padding:1.5rem;
  }
  .container{
    display:flex;
    width:100%;
    height:100%;
    border-radius: 1rem;
    overflow: hidden;
    filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
  }
  .image{
    max-width:55%;
    max-height:100%;
    background-color:#334155;
    object-fit:contain;
  }
  .title{
    padding:2px;
    padding-left:1rem;
    font-size:4rem;
    color:white;
    background-color:black;
  }
  .content{
    display:flex;
    flex-grow:1;
    flex-direction: column;
  }
  .map{
    flex-grow:1;
    background-color:white;
  }
  .marker{
    height:2rem;
    width:2rem;
    border-radius:50%;
    background-color:${props.color};
    position:relative;
  }
  .marker-1{
    position: absolute;
    background-color:${props.color};
    height:100%;
    width:100%;
    border-radius:50%;
    opacity:0.4;
    transform: scale(2);
  }
`;
const script = (props) => `
  const mapStyle = {
    version: 8,
    sources: {
      OSM: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: "OSM",
        type: "raster",
        source: "OSM",
        minzoom: 0,
        maxzoom: 18,
      },
    ],
  };
  const coord = [parseFloat("${props.lng}"), parseFloat("${props.lat}")];
  const loadMap = () => {
    console.log("image load");
    const map = new mapboxgl.Map({
      container: "map",
      style: mapStyle,
      center: coord,
      zoom: 16,
      maxZoom: 18,
    });
    const template = document.getElementById("marker");
    const clone = document.importNode(template.content, true);
    const el = clone.firstElementChild;
    new mapboxgl.Marker(el).setLngLat(coord).addTo(map);
  };
  const image = document.getElementById("image");
  image.src='${props.imagePath}'
  image.addEventListener("load",loadMap)
`;

const Content = (props) => (
  <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/mapbox-gl@1.13.2/dist/mapbox-gl.min.js"></script>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: styles(props) }}></style>
    </head>
    <body>
      <template id="marker">
        <div className="marker">
          <span className="marker-1"></span>
        </div>
      </template>
      <div className="wrapper">
        <div className="container">
          <img className="image" id="image" />
          <div className="content">
            <h1 className="title">{props.title}</h1>
            <div className="map" id="map"></div>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script(props) }}></script>
    </body>
  </html>
);

const defaultMeta = {
  title: "",
  imagePath: "",
  color: "#fff",
  lat: 0,
  lng: 0,
  bg: `linear-gradient(45deg,#10b981 0%,#06b6d4 100%)`,
};

let browser;

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const viewport = { width: 1200, height: 630 };
      const browser = await playwright.launchChromium({ headless: true });
      const page = await browser.newPage({ viewport });
      const props = { ...defaultMeta, ...req.body };
      const markup = ReactDOM.renderToStaticMarkup(<Content {...props} />);
      const html = `<!doctype html>${markup}`;
      await page.setContent(html, { waitUntil: "networkidle" });
      const image = await page.screenshot({
        type: "png",
        omitBackground: true,
      });
      await browser.close();
      res.setHeader(
        "Cache-Control",
        "s-maxage=31536000, stale-while-revalidate"
      );
      res.setHeader("Content-Type", "image/png");
      res.end(image);
    }
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send("some error happened");
  }
};
