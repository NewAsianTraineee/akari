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
    name: "Salmon Nigiri — 2 pieces",
    nameJp: "鮭握り 二貫",
    description:
      "Two pieces of salmon nigiri — warm shari, brushed with aged shoyu, served in the classic oval form.",
    price: "39",
    image: "/images/menu/nigiri-set.jpg",
    alt: "Two pieces of salmon nigiri on a black plate",
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