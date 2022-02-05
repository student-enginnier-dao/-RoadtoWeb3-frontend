import { useMintMeta } from "@/hooks/mintHooks";
import { getLocation } from "@/util/mint";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { MintFormWrapper } from "./MintFormWrapper";

export const GetLocation = () => {
  const [map, mapContainer] = [useRef<mapboxgl.Map>(null!), useRef(null)];
  const [nftMeta, setNftMeta] = useMintMeta();
  const onClick = async () => {
    try {
      const location = await getLocation();
      if (location) {
        await loadMap();
        setNftMeta({ location });
      }
    } catch (e) {
      window && window.alert("Failed to acquire location information.");
      console.error(e);
    }
  };
  const loadMap = async () => {
    if (mapContainer.current && nftMeta.location && !map.current) {
      const mapboxgl = (await import("mapbox-gl")).default;
      const MapboxLanguage = (await import("@mapbox/mapbox-gl-language"))
        .default as any;
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [
          nftMeta.location.coords.longitude,
          nftMeta.location.coords.latitude,
        ],
        zoom: 14,
      });
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        showAccuracyCircle: false,
        trackUserLocation: true,
        showUserHeading: true,
      });

      map.current.addControl(geolocateControl);
      map.current.addControl(new MapboxLanguage());
      await new Promise<void>((resolve) => {
        map.current.on("load", () => {
          geolocateControl.trigger();
          resolve();
        });
      });
    }
  };

  useEffect(() => {
    loadMap();
  }, [nftMeta]);

  return (
    <MintFormWrapper step={2}>
      <h2 className="grow-0 p-2 font-anton text-4xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        Step 2: Get Your Location🧭
      </h2>
      <div className="flex flex-col grow px-2 rounded-lg sm:flex-row">
        <p className="text-xl sm:w-1/2">
          In this step, we obtain the location information to be used for NFT.
          Please press the button on the right to allow our program to get your
          location information.
        </p>
        <div className="relative mt-2 h-2/3 sm:w-1/2">
          {nftMeta.location ? (
            <>
              <div ref={mapContainer} className="h-full rounded-lg"></div>
              <div className="absolute inset-0 w-full h-full"></div>
            </>
          ) : (
            <button className="home-button" onClick={onClick}>
              Get Your Location
            </button>
          )}
        </div>
      </div>
    </MintFormWrapper>
  );
};
