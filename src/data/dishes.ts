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
    name: "Salmon Nigiri — 6 pieces",
    nameJp: "鮭握り 六貫",
    description:
      "Six pieces of salmon nigiri — warm shari, brushed with aged shoyu, served in the classic oval form.",
    price: "79",
    image: "/images/menu/nigiri-set.jpg",
    alt: "Six pieces of salmon nigiri on a white plate",
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