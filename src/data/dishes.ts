export type SignatureDish = {
  name: string;
  nameJp?: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  span?: string;
};

// Two menu highlights — a twelve-piece nigiri set and a twelve-piece
// traditional roll set. Photos from Unsplash.
export const signatureDishes: SignatureDish[] = [
  {
    name: "Nigiri — 12 pieces",
    nameJp: "握り膳",
    description:
      "Twelve pieces of the day's nigiri on a single plate — warm shari, brushed with aged shoyu, timed to you.",
    price: "From 320",
    image: "/images/menu/nigiri-set.jpg",
    alt: "Twelve pieces of nigiri served on a dark plate",
  },
  {
    name: "Rolls — 12 pieces",
    nameJp: "巻き膳",
    description:
      "Twelve traditional rolls cut to order — crisp nori, seasoned rice, a quiet nod to the classics.",
    price: "From 260",
    image: "/images/menu/rolls-set.jpg",
    alt: "Twelve traditional sushi rolls served on a dark plate",
  },
];