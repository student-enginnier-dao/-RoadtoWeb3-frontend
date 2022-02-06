import { NFTMetaStore } from "@/types/nftMeta";
import ColorHash from "color-hash";
import { atom, selector } from "recoil";

export const isOpenMint = atom({ key: "isOpenMint", default: false });

export const mintStep = atom({ key: "mintStep", default: 1 });

export const mintData = atom<NFTMetaStore>({
  key: "mintData",
  default: { image: null, location: null, title: "", color: "#0ea5e9" },
});

export const cardBlob = atom<Blob | null>({ key: "mintFile", default: null });

export const selectedImagePath = selector({
  key: "imagepath",
  get({ get }) {
    const { image } = get(mintData);
    return image ? URL.createObjectURL(image) : null;
  },
});

export const cardUrl = selector({
  key: "cardUrl",
  get({ get }) {
    return get(cardBlob) && URL.createObjectURL(get(cardBlob as any));
  },
});

export const stepValidation = selector({
  key: "validation",
  get({ get }) {
    const data = get(mintData);
    const _cardBlob = get(cardBlob);
    return [
      Boolean(data.image),
      Boolean(data.location),
      Boolean(data.title && data.color),
      Boolean(data.image) &&
        Boolean(data.location) &&
        Boolean(data.title && data.color),
      Boolean(_cardBlob),
    ];
  },
});

export const forShowMeta = selector({
  key: "showMeta",
  get({ get }) {
    const { title, location, color } = get(mintData);
    const imagePath = get(selectedImagePath) || "";
    const colorHash = new ColorHash();
    const viaColor = colorHash.hex(title + imagePath);
    const toColor = colorHash.hex(title + imagePath + "7");
    const deg = title.split("").reduce((a, b) => a + b.charCodeAt(0), 0) / 360;
    return {
      title,
      imagePath,
      color,
      lat: location?.coords.latitude || 0,
      lng: location?.coords.longitude || 0,
      bg: `linear-gradient(${deg}deg,${viaColor} 0%,${toColor} 100%)`,
    };
  },
});
