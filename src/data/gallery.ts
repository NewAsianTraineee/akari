export type GalleryImage = {
  src: string;
  alt: string;
  tall?: boolean;
  wide?: boolean;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/gallery-01.jpg",
    alt: "Lyxig verkstad - detalj",
    wide: true,
  },
  {
    src: "/images/gallery/gallery-02.jpg",
    alt: "Premium bil i verkstaden",
    tall: true,
  },
  {
    src: "/images/gallery/gallery-03.jpg",
    alt: "Hantverk i fokus",
  },
  {
    src: "/images/interior/interior-01.jpg",
    alt: "Ren verkstadsmiljö",
  },
  {
    src: "/images/interior/interior-02.jpg",
    alt: "Diagnos och verktyg",
  },
  {
    src: "/images/chef/chef-01.jpg",
    alt: "Noggrant arbete",
    tall: true,
  },
  {
    src: "/images/cuts/cuts-01.jpg",
    alt: "Sportbil under service",
  },
  {
    src: "/images/hero/hero-02.jpg",
    alt: "Aureum verkstad",
  },
];

export type RestaurantScene = {
  src: string;
  alt: string;
};

export const interiorScenes: RestaurantScene[] = [
  {
    src: "/images/interior/interior-01.jpg",
    alt: "Verkstadslokalen",
  },
  {
    src: "/images/interior/interior-02.jpg",
    alt: "Servicehörna",
  },
  {
    src: "/images/gallery/gallery-01.jpg",
    alt: "Detaljer",
  },
];

export const gallery = galleryImages;
