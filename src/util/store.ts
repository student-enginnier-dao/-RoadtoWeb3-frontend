import { NFTMetaStore } from "@/types/nftMeta";
import { atom, selector } from "recoil";

export const isOpenMint = atom({ key: "isOpenMint", default: false });

export const mintStep = atom({ key: "mintStep", default: 1 });

export const mintData = atom<NFTMetaStore>({
  key: "mintData",
  default: { image: null },
});

export const selectedImagePath = selector({
  key: "imagepath",
  get({ get }) {
    const { image } = get(mintData);
    return image ? URL.createObjectURL(image) : null;
  },
});

export const stepValidation = selector({
  key: "validation",
  get({ get }) {
    const data = get(mintData);
    return [Boolean(data.image)];
  },
});
