import { NFTMetaStore } from "@/types/nftMeta";
import {
  isOpenMint,
  mintData,
  mintStep,
  selectedImagePath,
  stepValidation,
} from "@/util/store";
import { useRecoilState, useRecoilValue } from "recoil";

export const useIsOpenMint = () => {
  return useRecoilState(isOpenMint);
};

export const useMintSteps = () => {
  return useRecoilState(mintStep);
};

export const useMintMeta = (): [
  NFTMetaStore,
  (obj: Partial<NFTMetaStore>) => void
] => {
  const [mintMeta, _setMintMeta] = useRecoilState(mintData);
  const setMintMeta = (obj: Partial<NFTMetaStore>) => {
    _setMintMeta({ ...mintMeta, ...obj });
  };

  return [mintMeta, setMintMeta];
};

export const useSelectedImagePath = () => useRecoilValue(selectedImagePath);

export const useValidation = () => useRecoilValue(stepValidation);
