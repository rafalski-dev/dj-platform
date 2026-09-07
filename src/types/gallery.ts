import { StaticImageData } from "next/image";

export type GalleryImageType = {
  id: number;
  imgSrc: StaticImageData;
  altKey: string;
  ratio: string;
  width?: string;
  hue?: string;
  contrast?: string;
  sizes?: string;
};
