import textBase from "!!raw-loader!./NFT.html";
import { NftHtmlData } from "@/types/nftMeta";
import ColorHash from "color-hash";

export const createNFTHTML = ({
  title,
  imagePath,
  color,
  lng,
  lat,
}: NftHtmlData) => {
  const colorHash = new ColorHash();
  const viaColor = colorHash.hex(title + imagePath);
  const toColor = colorHash.hex(title + imagePath + "7");
  const deg = title.split("").reduce((a, b) => a + b.charCodeAt(0), 0) / 360;

  const html = textBase
    .replaceAll("!{Title}", title)
    .replaceAll("!{ImagePath}", imagePath)
    .replaceAll("!{Color}", color)
    .replaceAll("!{Lng}", String(lng))
    .replaceAll("!{Lat}", String(lat))
    .replaceAll(
      "!{BGColor}",
      `linear-gradient(${deg}deg,${viaColor} 0%,${toColor} 100%)`
    );
  return html;
};
