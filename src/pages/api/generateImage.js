import * as playwright from "playwright-aws-lambda";
import ReactDOM from "react-dom/server";

const styles = (props) => `
  *{
    margin:0;
    padding:0;
  }
  html, body {
    height: 100%;
    display: grid;
  }

  div{
    background-image:${props.bg};
    width:100%;
    height:100%;
  }
`;

const Content = (props) => (
  <html>
    <head>
      <style>{styles(props)}</style>
    </head>
    <body>
      <div className="container">
        <h1>Hello World</h1>
      </div>
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

export default async (req, res) => {
  const viewport = { width: 1200, height: 630 };
  const browser = await playwright.launchChromium({ headless: true });
  const page = await browser.newPage({ viewport });
  const props = { ...defaultMeta, title: "Hello OGP!" };
  const markup = ReactDOM.renderToStaticMarkup(<Content {...props} />);
  const html = `<!doctype html>${markup}`;
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  const image = await page.screenshot({ type: "png" });
  await browser.close();
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");
  res.end(image);
};
