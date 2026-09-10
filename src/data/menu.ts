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
        price: "120",
        alt: "Ōtoro nigiri with tuna belly",
      },
      {
        name: "Chūtoro",
        description: "Medium fatty tuna, wasabi stem, sudachi.",
        price: "95",
        alt: "Chutoro nigiri, medium fatty tuna",
      },
      {
        name: "Amaebi",
        description: "Sweet shrimp, razor-thin shiso, sea salt.",
        price: "85",
        alt: "Sweet shrimp nigiri",
      },
      {
        name: "Uni",
        description: "Sea urchin, nori, wasabi — served on demand.",
        price: "130",
        alt: "Sea urchin nigiri",
      },
      {
        name: "Shimaaji",
        description: "Striped jack, cured, scallion oil.",
        price: "75",
        alt: "Striped jack nigiri",
      },
      {
        name: "Kohada",
        description: "Gizzard shad, pressed and aged in salt.",
        price: "60",
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
        price: "220",
        alt: "Assorted sashimi selection",
      },
      {
        name: "Tai",
        description: "Sea bream, ponzu, citrus salt.",
        price: "130",
        alt: "Sea bream sashimi",
      },
      {
        name: "Madai Usuzukuri",
        description: "Paper-thin sea bream, yuzu, olive oil.",
        price: "135",
        alt: "Thinly sliced sea bream sashimi",
      },
      {
        name: "Hotate",
        description: "Hokkaido scallop, yuzu kosho, shiso.",
        price: "115",
        alt: "Scallop sashimi",
      },
      {
        name: "Kinmedai",
        description: "Golden eye snapper, blush of sear.",
        price: "140",
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
        price: "995",
        alt: "Omakase tasting menu at the counter",
      },
      {
        name: "Omakase — Add Sake Pairing",
        description: "Seven glasses of sake and a gentle white, chosen with the menu.",
        price: "495",
        alt: "Sake pairing glasses",
      },
      {
        name: "Omakase — Chef's Table",
        description: "The full counter, seated directly before the chef.",
        price: "1,195",
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
        price: "95",
        alt: "Chawanmushi steamed egg",
      },
      {
        name: "Hamachi Kama",
        description: "Grilled yellowtail collar, ponzu, shichimi.",
        price: "110",
        alt: "Grilled yellowtail collar",
      },
      {
        name: "Edamame",
        description: "Hand-salted, toasted black garlic.",
        price: "45",
        alt: "Hand-salted edamame",
      },
      {
        name: "Agedashi Tofu",
        description: "Silken tofu, bonito dashi, kinome.",
        price: "65",
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
        price: "75",
        alt: "Yuzu dessert",
      },
      {
        name: "Matcha",
        description: "Uji matcha ice cream, azuki, mochi.",
        price: "70",
        alt: "Matcha ice cream dessert",
      },
      {
        name: "Miso Caramel",
        description: "Caramel, shiro miso, sesame brittle.",
        price: "75",
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
        price: "65",
        alt: "Glass of junmai daiginjo sake",
      },
      {
        name: "Koshu",
        description: "Aged sake, dried fruit and cedar.",
        price: "85",
        alt: "Glass of aged koshu sake",
      },
      {
        name: "Cold-brew Hojicha",
        description: "Slow-steeped, smoky, served cold.",
        price: "50",
        alt: "Cold-brew hojicha tea",
      },
    ],
  },
];