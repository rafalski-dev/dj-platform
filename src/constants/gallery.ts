import crowdImg from "../assets/images/gallery/crowd-dancing-with-dj.jpg";
import weedingVenue from "../assets/images/gallery/wedding-venue.jpg";
import outdoorWedding from "../assets/images/gallery/outdoor-wedding.jpg";
import newlyweds from "../assets/images/gallery/newlyweds-dance.jpg";
import djStand from "../assets/images/gallery/dj-stand.jpg";
import { GalleryImageType } from "@/types/gallery";

export const galleryData: GalleryImageType[] = [
  {
    id: 1,
    imgSrc: crowdImg,
    altKey: "crowd",
    ratio: "aspect-4/3",
    hue: "hue-rotate-15",
    width: "lg:col-span-3",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    id: 2,
    imgSrc: weedingVenue,
    altKey: "weddingVenue",
    ratio: "aspect-4/3",
    contrast: "contrast-108",
    hue: "hue-rotate-05",
    width: "lg:col-span-3",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    id: 3,
    imgSrc: outdoorWedding,
    altKey: "outdoorCeremony",
    ratio: "aspect-4/3",
    contrast: "contrast-130",
    width: "lg:col-span-2",
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    id: 4,
    imgSrc: newlyweds,
    altKey: "newlyWeds",
    ratio: "aspect-4/3",
    contrast: "contrast-110",
    width: "lg:col-span-2",
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  {
    id: 5,
    imgSrc: djStand,
    altKey: "djStand",
    ratio: "aspect-4/3",
    contrast: "contrast-120",
    width: "lg:col-span-2",
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
];
