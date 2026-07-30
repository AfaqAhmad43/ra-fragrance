import { useState } from "react";
import { MessageCircle, Sparkles, Filter, Check } from "lucide-react";
import playBoyz from "@/assets/play-boyz.jpeg";
import elegant from "@/assets/elegant.jpeg";
import twinkleQueen from "@/assets/twinkle-queen.jpeg";
import glowingGirl from "@/assets/glowing-girl.jpeg";
import sportsMania from "@/assets/sports-mania.jpeg";
import primeScent from "@/assets/prime-scent.jpeg";
import everwake from "@/assets/everwake.jpeg";

const WHATSAPP_BASE = "https://wa.me/923325553408?text=";

interface Product {
  id: string;
  name: string;
  category: "Unisex" | "For Him" | "For Her";
  image: string;
  tagline: string;
  notes: { top: string; heart: string; base: string };
  badge?: string;
}

const products: Product[] = [
  {
    id: "prime-scent",
    name: "Prime Scent",
    category: "Unisex",
    image: primeScent,
    tagline: "A memory in every drop",
    notes: { top: "Bergamot & Saffron", heart: "Turkish Rose & Cedarwood", base: "Amber & Warm Vanilla" },
    badge: "Flagship",
  },
  {
    id: "everwake",
    name: "Everwake",
    category: "Unisex",
    image: everwake,
    tagline: "Bold. Confident. Unforgettable.",
    notes: { top: "Fresh Citrus Accord", heart: "Spicy Cardamom & Lavender", base: "Vetiver & Smoky Leather" },
    badge: "Bestseller",
  },
  {
    id: "play-boyz",
    name: "Play Boyz",
    category: "For Him",
    image: playBoyz,
    tagline: "Audacious & Charismatic",
    notes: { top: "Crisp Apple & Mint", heart: "Tonka Bean & Geranium", base: "Oakmoss & Cedar" },
  },
  {
    id: "elegant",
    name: "Elegant",
    category: "For Him",
    image: elegant,
    tagline: "Refined Sophistication",
    notes: { top: "Calabrian Bergamot", heart: "Sichuan Pepper & Elemi", base: "Ambroxan & Labdanum" },
  },
  {
    id: "twinkle-queen",
    name: "Twinkle Queen",
    category: "For Her",
    image: twinkleQueen,
    tagline: "Radiant & Enchanting",
    notes: { top: "Sweet Jasmine & Pear", heart: "White Lily & Orange Blossom", base: "Cashmere Wood & Musk" },
  },
  {
    id: "glowing-girl",
    name: "Glowing Girl",
    category: "For Her",
    image: glowingGirl,
    tagline: "Luminous & Sensual",
    notes: { top: "Wild Berries & Mandarin", heart: "Honeysuckle & Gardenia", base: "Amber, Caramel & Vanilla" },
  },
  {
    id: "sports-mania",
    name: "Sports Mania",
    category: "For Him",
    image: sportsMania,
    tagline: "High Energy & Dynamic",
    notes: { top: "Grapefruit & Sea Notes", heart: "Jasmine & Bay Leaf", base: "Guaiac Wood & Patchouli" },
  },
];

const categories = ["All", "Unisex", "For Him", "For Her"] as const;

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-background text-foreground pt-32 pb-24 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-body tracking-[0.25em] uppercase mb-4 backdrop-blur-md">
            <Sparkles size={14} />
            <span>RA Fragrance Catalog</span>
          </div>
          <h1 className="font-display text-gold-gradient text-4xl sm:text-6xl tracking-wide font-bold mb-4">
            The RA Collection
          </h1>
          <p className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed">
            Every bottle is an ode to elegance. Filter by preference and select your signature scent.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap mb-16">
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground mr-2">
            <Filter size={14} className="text-primary" />
            <span className="uppercase tracking-widest hidden sm:inline">Filter:</span>
          </div>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-primary/90 via-primary to-amber-600 text-background font-semibold shadow-lg shadow-primary/25 scale-105"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="glass-card rounded-2xl overflow-hidden glass-card-hover group flex flex-col justify-between"
            >
              <div>
                {/* Product Image */}
                <div className="product-image-wrapper aspect-[3/4] overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={`${product.name} — RA Fragrance`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-background/85 backdrop-blur-md border border-primary/30 text-primary text-[10px] tracking-[0.2em] uppercase font-body px-3 py-1 rounded-full font-medium shadow-md">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="bg-primary text-background font-bold text-[10px] tracking-[0.2em] uppercase font-body px-3 py-1 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="font-display text-foreground text-2xl tracking-wide font-semibold">
                    {product.name}
                  </h2>
                  <p className="font-body text-primary text-xs tracking-[0.2em] uppercase mt-1">
                    {product.tagline}
                  </p>

                  {/* Scent Notes breakdown */}
                  <div className="mt-4 pt-4 border-t border-border/40 space-y-1.5 font-body text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-medium text-[10px] uppercase tracking-wider w-12">Top:</span>
                      <span>{product.notes.top}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-medium text-[10px] uppercase tracking-wider w-12">Heart:</span>
                      <span>{product.notes.heart}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-medium text-[10px] uppercase tracking-wider w-12">Base:</span>
                      <span>{product.notes.base}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <div className="p-6 pt-0">
                <a
                  href={`${WHATSAPP_BASE}${encodeURIComponent(`Hi, I'm interested in buying ${product.name} from RA Fragrance!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs w-full py-3.5 flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle size={16} />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Custom Order Callout */}
        <div className="mt-20 glass-card rounded-3xl p-10 text-center border border-primary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="font-display text-gold-gradient text-2xl sm:text-3xl tracking-wide mb-3">
            Can't Decide Which Scent Fits You Best?
          </h3>
          <p className="font-body text-muted-foreground text-sm max-w-md mx-auto mb-6">
            Message us directly on WhatsApp for personalized scent recommendations based on your style and preference.
          </p>
          <a
            href={`${WHATSAPP_BASE}${encodeURIComponent("Hi! Can you recommend a scent from RA Fragrance for me?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs px-8 py-3.5 inline-flex items-center gap-2"
          >
            <MessageCircle size={16} />
            <span>Consult via WhatsApp</span>
          </a>
        </div>

      </div>
    </main>
  );
};

export default Collection;
