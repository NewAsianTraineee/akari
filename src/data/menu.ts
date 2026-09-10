export type Dish = {
  name: string;
  nameJp?: string;
  description: string;
  price: string;
  alt: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  note: string;
  items: Dish[];
};

// Prices are demo values — replace in src/data/menu.ts.
export const menuCategories: MenuCategory[] = [
  {
    id: "sushi",
    label: "Sushi",
    note: "Shari seasoned with house-aged akazu blend.",
    items: [
      {
        name: "Ōtoro",
        description: "Bluefin tuna belly, warmed by hand, aged shoyu.",
        price: "220",
        alt: "Ōtoro nigiri with tuna belly",
      },
      {
        name: "Chūtoro",
        description: "Medium fatty tuna, wasabi stem, sudachi.",
        price: "180",
        alt: "Chutoro nigiri, medium fatty tuna",
      },
      {
        name: "Amaebi",
        description: "Sweet shrimp, razor-thin shiso, sea salt.",
        price: "160",
        alt: "Sweet shrimp nigiri",
      },
      {
        name: "Uni",
        description: "Sea urchin, nori, wasabi — served on demand.",
        price: "240",
        alt: "Sea urchin nigiri",
      },
      {
        name: "Shimaaji",
        description: "Striped jack, cured, scallion oil.",
        price: "150",
        alt: "Striped jack nigiri",
      },
      {
        name: "Kohada",
        description: "Gizzard shad, pressed and aged in salt.",
        price: "120",
        alt: "Gizzard shad nigiri",
      },
    ],
  },
  {
    id: "sashimi",
    label: "Sashimi",
    note: "Cut to order, served on chilled stone.",
    items: [
      {
        name: "Sashimi Moriawase",
        description: "Chef's selection of five cuts from the day's arrival.",
        price: "320",
        alt: "Assorted sashimi selection",
      },
      {
        name: "Tai",
        description: "Sea bream, ponzu, citrus salt.",
        price: "180",
        alt: "Sea bream sashimi",
      },
      {
        name: "Madai Usuzukuri",
        description: "Paper-thin sea bream, yuzu, olive oil.",
        price: "190",
        alt: "Thinly sliced sea bream sashimi",
      },
      {
        name: "Hotate",
        description: "Hokkaido scallop, yuzu kosho, shiso.",
        price: "170",
        alt: "Scallop sashimi",
      },
      {
        name: "Kinmedai",
        description: "Golden eye snapper, blush of sear.",
        price: "200",
        alt: "Golden eye snapper sashimi",
      },
    ],
  },
  {
    id: "omakase",
    label: "Omakase",
    note: "The full counter — twelve to fourteen courses.",
    items: [
      {
        name: "Omakase — Full Counter",
        description:
          "Twelve to fourteen courses, composed from the morning arrival. Rice, fish, temperature — timed to you.",
        price: "1,450",
        alt: "Omakase tasting menu at the counter",
      },
      {
        name: "Omakase — Add Sake Pairing",
        description: "Seven glasses of sake and a gentle white, chosen with the menu.",
        price: "790",
        alt: "Sake pairing glasses",
      },
      {
        name: "Omakase — Chef's Table",
        description: "The full counter, seated directly before the chef.",
        price: "1,650",
        alt: "Chef's table omakase seating",
      },
    ],
  },
  {
    id: "small",
    label: "Small Plates",
    note: "To begin, or to accompany sake.",
    items: [
      {
        name: "Chawanmushi",
        description: "Silken egg, dashi, snow crab, mitsuba.",
        price: "140",
        alt: "Chawanmushi steamed egg",
      },
      {
        name: "Hamachi Kama",
        description: "Grilled yellowtail collar, ponzu, shichimi.",
        price: "160",
        alt: "Grilled yellowtail collar",
      },
      {
        name: "Edamame",
        description: "Hand-salted, toasted black garlic.",
        price: "60",
        alt: "Hand-salted edamame",
      },
      {
        name: "Agedashi Tofu",
        description: "Silken tofu, bonito dashi, kinome.",
        price: "90",
        alt: "Agedashi tofu in dashi",
      },
    ],
  },
  {
    id: "dessert",
    label: "Dessert",
    note: "A quiet end to the evening.",
    items: [
      {
        name: "Yuzu",
        description: "Yuzu curd, white chocolate, citrus crisp.",
        price: "110",
        alt: "Yuzu dessert",
      },
      {
        name: "Matcha",
        description: "Uji matcha ice cream, azuki, mochi.",
        price: "100",
        alt: "Matcha ice cream dessert",
      },
      {
        name: "Miso Caramel",
        description: "Caramel, shiro miso, sesame brittle.",
        price: "105",
        alt: "Miso caramel dessert",
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    note: "A short list, chosen with the kitchen.",
    items: [
      {
        name: "Junmai Daiginjo",
        description: "Fruit-forward, clean finish — the house pour.",
        price: "95",
        alt: "Glass of junmai daiginjo sake",
      },
      {
        name: "Koshu",
        description: "Aged sake, dried fruit and cedar.",
        price: "120",
        alt: "Glass of aged koshu sake",
      },
      {
        name: "Cold-brew Hojicha",
        description: "Slow-steeped, smoky, served cold.",
        price: "70",
        alt: "Cold-brew hojicha tea",
      },
    ],
  },
];