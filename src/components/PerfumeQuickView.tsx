import { useState } from "react";
import { MessageCircle, X, Sparkles, Clock, ShieldCheck, Zap, Award } from "lucide-react";
import { Perfume } from "@/types/perfume";
import { trackEvent } from "@/lib/analytics";
import confetti from "canvas-confetti";

interface PerfumeQuickViewProps {
  perfume: Perfume | null;
  onClose: () => void;
}

const WHATSAPP_BASE = "https://wa.me/923325553408?text=";

export const PerfumeQuickView = ({ perfume, onClose }: PerfumeQuickViewProps) => {
  if (!perfume) return null;

  const [activeImage, setActiveImage] = useState(perfume.image_url);
  const allImages = [perfume.image_url, ...(perfume.gallery_images || [])];

  const handleWhatsAppOrder = () => {
    trackEvent("whatsapp_order_click", perfume.name, perfume.category);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.2 },
      colors: ["#FBF0B9", "#DFB76C", "#997530", "#F5E1A4"],
    });
  };

  const message = `Hi RA Fragrance! I would like to order *${perfume.name}* (${perfume.price || "PKR 3,500"}). Please share payment & delivery details for Pakistan delivery!`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="glass-card rounded-3xl p-6 md:p-10 max-w-3xl w-full border border-primary/40 shadow-2xl relative my-8 gold-glow max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-2 rounded-full border border-border/40 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Photo Gallery */}
          <div className="space-y-4">
            <div className="product-image-wrapper aspect-[3/4] overflow-hidden rounded-2xl border border-primary/30 relative bg-card shadow-xl">
              <img
                src={activeImage}
                alt={`${perfume.name} — RA Fragrance`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-background/85 backdrop-blur-md border border-primary/30 text-primary text-[10px] tracking-[0.2em] uppercase font-body px-3 py-1 rounded-full font-medium">
                  {perfume.category}
                </span>
                {perfume.badge && (
                  <span className="bg-primary text-background font-bold text-[10px] tracking-[0.2em] uppercase font-body px-3 py-1 rounded-full">
                    {perfume.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-14 h-16 rounded-xl overflow-hidden border transition-all ${
                      activeImage === imgUrl ? "border-primary ring-2 ring-primary/40 scale-105" : "border-primary/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Specs */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-body tracking-[0.25em] uppercase text-primary mb-1">
                RA Fragrance Selection
              </p>
              <h2 className="font-display text-gold-gradient text-3xl md:text-4xl font-bold tracking-wide">
                {perfume.name}
              </h2>
              <p className="font-body text-muted-foreground text-sm italic mt-1">
                {perfume.tagline}
              </p>
              {perfume.price && (
                <p className="font-display text-primary text-2xl font-semibold mt-3">
                  {perfume.price}
                </p>
              )}
            </div>

            {/* Scent Notes */}
            <div className="p-4 rounded-2xl bg-card/60 border border-primary/20 space-y-2 text-xs font-body">
              <h4 className="font-display text-primary uppercase text-[11px] tracking-[0.2em] font-semibold mb-2">
                Fragrance Architecture
              </h4>
              <div className="flex items-start gap-2">
                <span className="text-primary font-semibold w-14 shrink-0">Top:</span>
                <span className="text-foreground/90">{perfume.notes.top || "Fresh Bergamot & Citrus"}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-semibold w-14 shrink-0">Heart:</span>
                <span className="text-foreground/90">{perfume.notes.heart || "Spicy Floral Accord"}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-semibold w-14 shrink-0">Base:</span>
                <span className="text-foreground/90">{perfume.notes.base || "Warm Amber & Oud"}</span>
              </div>
            </div>

            {/* Scent Performance Ratings */}
            <div className="space-y-3 font-body text-xs">
              <div>
                <div className="flex items-center justify-between text-muted-foreground mb-1">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <Clock size={14} className="text-primary" />
                    <span>Longevity & Projection</span>
                  </span>
                  <span className="text-primary font-bold">12+ Hours</span>
                </div>
                <div className="w-full h-2 bg-card rounded-full overflow-hidden border border-primary/20">
                  <div className="h-full bg-gradient-to-r from-primary/80 via-primary to-amber-500 rounded-full w-[90%]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-muted-foreground mb-1">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <Zap size={14} className="text-primary" />
                    <span>Sillage Intensity</span>
                  </span>
                  <span className="text-primary font-bold">Heavy / Distinctive</span>
                </div>
                <div className="w-full h-2 bg-card rounded-full overflow-hidden border border-primary/20">
                  <div className="h-full bg-gradient-to-r from-primary/80 via-primary to-amber-500 rounded-full w-[85%]" />
                </div>
              </div>
            </div>

            {/* Delivery Guarantees */}
            <div className="flex items-center gap-4 text-[11px] font-body text-muted-foreground pt-2 border-t border-border/40">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-primary" />
                <span>100% Authentic</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award size={14} className="text-primary" />
                <span>Handcrafted in Gujranwala</span>
              </span>
            </div>

            {/* Order CTA */}
            <a
              href={`${WHATSAPP_BASE}${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppOrder}
              className="btn-primary text-xs w-full py-4 flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle size={17} />
              <span>Order on WhatsApp</span>
            </a>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PerfumeQuickView;
