export type GalleryImage = {
  src: string;
  alt: string;
  tall?: boolean;
  wide?: boolean;
};

// Demo gallery — replace images in public/images/gallery/ and update paths here.
export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/nigiri-01.jpg",
    alt: "Nigiri set down at the counter",
    wide: true,
  },
  {
    src: "/images/gallery/interior-01.jpg",
    alt: "The omakase counter in warm evening light",
    tall: true,
  },
  {
    src: "/images/gallery/sashimi-01.jpg",
    alt: "Sashimi arranged on chilled stone",
  },
  {
    src: "/images/restaurant/detail.jpg",
    alt: "Material detail — warm light at the counter",
  },
  {
    src: "/images/gallery/interior-02.jpg",
    alt: "Table setting in gold-light",
  },
  {
    src: "/images/gallery/chef-01.jpg",
    alt: "The chef at work, evening service",
    tall: true,
  },
  {
    src: "/images/menu/omakase.jpg",
    alt: "Omakase courses at the counter",
  },
  {
    src: "/images/menu/amaebi.jpg",
    alt: "Nigiri touched with wasabi and shiso",
  },
];

export type RestaurantScene = {
  src: string;
  alt: string;
};

export const interiorScenes: RestaurantScene[] = [
  {
    src: "/images/restaurant/counter.jpg",
    alt: "The sushi counter",
  },
  {
    src: "/images/restaurant/room.jpg",
    alt: "The dining room",
  },
  {
    src: "/images/restaurant/detail.jpg",
    alt: "Material detail — warm wood and stone",
  },
];