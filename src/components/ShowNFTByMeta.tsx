import { NftHtmlData } from "@/types/nftMeta";
import { createNFTHTML } from "@/util/createNftHtml";
import React, { useEffect, useState } from "react";

export const ShowNFTByMeta: React.FC<NftHtmlData> = (obj) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const htmlText = createNFTHTML(obj);
    const blob = new Blob([htmlText], { type: "text/html" });
    const _url = URL.createObjectURL(blob);
    setUrl(_url);
  }, [obj]);
  return (
    <iframe
      id="page1"
      src={url}
      className="aspect-[5/8] w-full max-h-full bg-gray-200"
    />
  );
};
