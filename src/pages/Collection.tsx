import { useState } from "react";
import { MessageCircle, Sparkles, Filter, Eye } from "lucide-react";
import { usePerfumes } from "@/hooks/usePerfumes";
import { Perfume } from "@/types/perfume";
import PerfumeQuickView from "@/components/PerfumeQuickView";
import { trackEvent } from "@/lib/analytics";
import confetti from "canvas-confetti";

const WHATSAPP_BASE = "https://wa.me/923325553408?text=";
const categories = ["All", "Unisex", "For Him", "For Her"] as const;

const Collection = () => {
  const { perfumes, loading } = usePerfumes();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);

  const filteredProducts = activeCategory === "All"
    ? perfumes
    : perfumes.filter((p) => p.category === activeCategory);

  const handleWhatsAppOrder = (product: Perfume) => {
    trackEvent("whatsapp_order_click", product.name, product.category);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.2 },
      colors: ["#FBF0B9", "#DFB76C", "#997530", "#F5E1A4"],
    });
  };

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
            Every bottle is an ode to elegance. Filter by preference or click any scent for full details & ratings.
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
                onClick={() => {
                  setActiveCategory(cat);
                  trackEvent("category_filter", cat, cat);
                }}
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
        {loading ? (
          <div className="text-center py-20 text-muted-foreground text-sm font-body">
            Loading fragrances...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="glass-card rounded-2xl overflow-hidden glass-card-hover group flex flex-col justify-between cursor-pointer"
                onClick={() => setSelectedPerfume(product)}
              >
                <div>
                  {/* Product Image */}
                  <div className="product-image-wrapper aspect-[3/4] overflow-hidden relative shimmer-gold group">
                    <img
                      src={product.image_url}
                      alt={`${product.name} — RA Fragrance`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Quick View Hover Badge */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-background/90 text-primary text-xs font-body tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-primary/40 flex items-center gap-1.5 shadow-xl">
                        <Eye size={14} />
                        <span>Quick View & Notes</span>
                      </span>
                    </div>

                    {/* Category & Badge */}
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
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-display text-foreground text-2xl tracking-wide font-semibold">
                        {product.name}
                      </h2>
                      {product.price && (
                        <span className="font-display text-primary text-sm font-semibold">
                          {product.price}
                        </span>
                      )}
                    </div>
                    
                    <p className="font-body text-primary text-xs tracking-[0.2em] uppercase mt-1">
                      {product.tagline}
                    </p>

                    {/* Scent Notes breakdown */}
                    <div className="mt-4 pt-4 border-t border-border/40 space-y-1.5 font-body text-xs text-muted-foreground">
                      {product.notes.top && (
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-medium text-[10px] uppercase tracking-wider w-12">Top:</span>
                          <span>{product.notes.top}</span>
                        </div>
                      )}
                      {product.notes.heart && (
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-medium text-[10px] uppercase tracking-wider w-12">Heart:</span>
                          <span>{product.notes.heart}</span>
                        </div>
                      )}
                      {product.notes.base && (
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-medium text-[10px] uppercase tracking-wider w-12">Base:</span>
                          <span>{product.notes.base}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <div className="p-6 pt-0">
                  <a
                    href={`${WHATSAPP_BASE}${encodeURIComponent(`Hi, I'm interested in buying ${product.name} from RA Fragrance!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppOrder(product);
                    }}
                    className="btn-primary text-xs w-full py-3.5 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle size={16} />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

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

      {/* Perfume Quick View Modal */}
      <PerfumeQuickView
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
      />
    </main>
  );
};

export default Collection;
