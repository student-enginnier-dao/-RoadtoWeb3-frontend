import { useCradBlob, useShowMetaData } from "@/hooks/mintHooks";
import * as MapboxLanguage from "@mapbox/mapbox-gl-language";
import html2canvas from "html2canvas";
import mapboxgl from "mapbox-gl";
import { useRef, useState } from "react";
import { MintFormWrapper } from "./MintFormWrapper";

export const GenerateImage = () => {
  const card = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const map = useRef<mapboxgl.Map>(null!);
  const setCardBlob = useCradBlob()[1];
  const mapContainer = useRef(null);
  const metaData = useShowMetaData();
  const loadMap = async () => {
    try {
      setIsProcessing(true);
      if (mapContainer.current && card.current && metaData && !map.current) {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [metaData.lng, metaData.lat],
          zoom: 14,
        });

        map.current.addControl(new MapboxLanguage());
        const div = document.createElement("div");
        div.style.borderRadius = "50%";
        div.style.height = "1rem";
        div.style.width = "1rem";
        div.style.backgroundColor = metaData.color;
        div.style.position = "relative";
        div.innerHTML = `<span style="position: absolute;background-color:${metaData.color};height:100%;width:100%;border-radius:50%;opacity:0.4;transform: scale(2);"></span>`;
        new mapboxgl.Marker(div)
          .setLngLat([metaData.lng, metaData.lat])
          .addTo(map.current);
        await new Promise((resolve) => map.current.on("load", resolve));
        const cardCanvas = await html2canvas(card.current, {});
        const cardBlob = await new Promise<Blob | null>((resolve) =>
          cardCanvas.toBlob(resolve, "image/webp", 0.75)
        );
        console.log(cardBlob && URL.createObjectURL(cardBlob));
        setCardBlob(null);
      }
    } catch (e) {
      setIsProcessing(false);
      console.error(e);
    }
  };

  return (
    <MintFormWrapper step={5}>
      <h2 className="grow-0 p-2 font-anton text-4xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        Step 6. Create static NFT card images
      </h2>
      <div className="flex flex-col grow gap-2 px-4">
        <p className="text-xl">
          It mainly generates images to be used when HTML cannot be embedded,
          such as spreading on SNS. It may take some time to generate the image,
          so please wait until you can press the Next button.
        </p>
        <button
          className="home-button"
          onClick={loadMap}
          disabled={isProcessing}
        >
          Start Generate
        </button>
        <section
          className="aspect-video p-2 max-w-md bg-white rounded-lg"
          style={{ backgroundImage: metaData.bg }}
          ref={card}
        >
          <div className="flex overflow-hidden w-full h-full rounded-lg">
            <img
              src={metaData.imagePath}
              alt={metaData.imagePath}
              className="max-w-1/2 rounded-l-lg"
            />
            <div className="flex relative flex-col grow">
              <h1 className="inline-flex px-1 font-anton text-2xl break-words bg-black">
                {metaData.title}
              </h1>
              <div className="grow bg-white" ref={mapContainer}></div>
              <div className="absolute inset-0"></div>
            </div>
          </div>
        </section>
      </div>
    </MintFormWrapper>
  );
};

export default GenerateImage;
