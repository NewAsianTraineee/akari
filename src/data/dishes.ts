export type SignatureDish = {
  name: string;
  nameJp?: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  span?: string;
};

// Demo dishes — images are placeholders to be replaced in public/images/menu/.
export const signatureDishes: SignatureDish[] = [
  {
    name: "Ōtoro",
    nameJp: "大とろ",
    description: "Bluefin tuna belly, rested on warm shari, brushed with aged shoyu.",
    price: "From 220",
    image: "/images/menu/otoro.jpg",
    alt: "Ōtoro nigiri with aged shoyu",
  },
  {
    name: "Uni",
    nameJp: "雲丹",
    description: "Hokkaido sea urchin, hand-rolled in crisp nori, a whisper of wasabi.",
    price: "From 240",
    image: "/images/menu/uni.jpg",
    alt: "Sea urchin hand roll",
  },
  {
    name: "Amaebi",
    nameJp: "甘エビ",
    description: "Sweet shrimp, warmed briefly in the hand, finished with sea salt and shiso.",
    price: "From 160",
    image: "/images/menu/amaebi.jpg",
    alt: "Sweet shrimp nigiri with shiso",
  },
  {
    name: "Omakase",
    nameJp: "おまかせ",
    description: "Twelve to fourteen courses, composed from the morning arrival.",
    price: "1,450",
    image: "/images/menu/omakase.jpg",
    alt: "Omakase courses at the counter",
  },
];