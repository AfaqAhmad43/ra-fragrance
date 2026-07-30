import { Perfume } from "@/types/perfume";
import primeScent from "@/assets/prime-scent.jpeg";
import everwake from "@/assets/everwake.jpeg";
import playBoyz from "@/assets/play-boyz.jpeg";
import elegant from "@/assets/elegant.jpeg";
import twinkleQueen from "@/assets/twinkle-queen.jpeg";
import glowingGirl from "@/assets/glowing-girl.jpeg";
import sportsMania from "@/assets/sports-mania.jpeg";

export const initialPerfumes: Perfume[] = [
  {
    id: "prime-scent",
    name: "Prime Scent",
    category: "Unisex",
    tagline: "A Memory in Every Drop",
    notes: {
      top: "Bergamot & Saffron",
      heart: "Turkish Rose & Cedarwood",
      base: "Amber & Warm Vanilla",
    },
    image_url: primeScent,
    badge: "Flagship",
  },
  {
    id: "everwake",
    name: "Everwake",
    category: "Unisex",
    tagline: "Bold. Confident. Unforgettable.",
    notes: {
      top: "Fresh Citrus Accord",
      heart: "Spicy Cardamom & Lavender",
      base: "Vetiver & Smoky Leather",
    },
    image_url: everwake,
    badge: "Bestseller",
  },
  {
    id: "play-boyz",
    name: "Play Boyz",
    category: "For Him",
    tagline: "Audacious & Charismatic",
    notes: {
      top: "Crisp Apple & Mint",
      heart: "Tonka Bean & Geranium",
      base: "Oakmoss & Cedar",
    },
    image_url: playBoyz,
  },
  {
    id: "elegant",
    name: "Elegant",
    category: "For Him",
    tagline: "Refined Sophistication",
    notes: {
      top: "Calabrian Bergamot",
      heart: "Sichuan Pepper & Elemi",
      base: "Ambroxan & Labdanum",
    },
    image_url: elegant,
  },
  {
    id: "twinkle-queen",
    name: "Twinkle Queen",
    category: "For Her",
    tagline: "Radiant & Enchanting",
    notes: {
      top: "Sweet Jasmine & Pear",
      heart: "White Lily & Orange Blossom",
      base: "Cashmere Wood & Musk",
    },
    image_url: twinkleQueen,
  },
  {
    id: "glowing-girl",
    name: "Glowing Girl",
    category: "For Her",
    tagline: "Luminous & Sensual",
    notes: {
      top: "Wild Berries & Mandarin",
      heart: "Honeysuckle & Gardenia",
      base: "Amber, Caramel & Vanilla",
    },
    image_url: glowingGirl,
  },
  {
    id: "sports-mania",
    name: "Sports Mania",
    category: "For Him",
    tagline: "High Energy & Dynamic",
    notes: {
      top: "Grapefruit & Sea Notes",
      heart: "Jasmine & Bay Leaf",
      base: "Guaiac Wood & Patchouli",
    },
    image_url: sportsMania,
  },
];
