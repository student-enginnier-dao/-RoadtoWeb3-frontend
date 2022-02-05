export interface NFTMetaStore {
  image: File | null;
  location: GeolocationPosition | null;
  title: string;
  color: string;
}

export interface NftHtmlData {
  title: string;
  imagePath: string;
  color: string;
  lng: number;
  lat: number;
}
