import logo from "@/assets/ra-fragrance-logo.png";
import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, Phone, ShieldCheck, Clock, Award, ArrowRight, Shield } from "lucide-react";
import { usePerfumes } from "@/hooks/usePerfumes";

const WHATSAPP_LINK = "https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20RA%20Fragrance!";
const PHONE_NUMBER = "+92 332 5553408";

const Index = () => {
  const { perfumes, loading } = usePerfumes();
  const featuredPerfumes = perfumes.slice(0, 3);

  return (
    <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background glow halos */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Gujranwala Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-body tracking-[0.25em] uppercase mb-8 backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-primary animate-spin-slow" />
            <span>Handcrafted in Gujranwala 🇵🇰</span>
          </div>

          {/* Glowing Emblem */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl group-hover:bg-primary/50 transition-all duration-700" />
            <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-full p-2 bg-gradient-to-b from-primary/60 via-primary/20 to-transparent shadow-2xl gold-glow-lg">
              <img
                src={logo}
                alt="RA Fragrance Emblem"
                className="w-full h-full object-contain rounded-full bg-card/90"
              />
            </div>
          </div>

          {/* Brand Titles */}
          <h1 className="font-display text-gold-gradient text-4xl sm:text-6xl md:text-7xl tracking-wide font-bold leading-tight">
            RA FRAGRANCE
          </h1>
          <p className="font-display text-lg sm:text-2xl text-muted-foreground tracking-[0.3em] uppercase mt-2">
            The Essence of Elegance
          </p>

          <p className="font-body text-foreground/80 text-sm md:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
            Where silence fades and scent remains. Artisanal luxury perfumes crafted to leave an undeniable impression.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            <Link to="/collection" className="btn-primary flex items-center gap-2">
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* BRAND HIGHLIGHTS BANNER */}
      <section className="border-y border-primary/20 bg-card/40 backdrop-blur-md py-10 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
            <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/30">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-display text-foreground text-base tracking-wide">Lasting Power</h3>
              <p className="font-body text-muted-foreground text-xs mt-1">Formulated for all-day projection & longevity.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
            <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/30">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-display text-foreground text-base tracking-wide">Undeniable Impact</h3>
              <p className="font-body text-muted-foreground text-xs mt-1">Sophisticated sillage that defines your presence.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
            <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/30">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-display text-foreground text-base tracking-wide">Authentic Craftsmanship</h3>
              <p className="font-body text-muted-foreground text-xs mt-1">Student-run luxury fragrance house from Punjab.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FRAGRANCES SHOWCASE */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Signature Selections</p>
          <h2 className="font-display text-gold-gradient text-3xl sm:text-5xl tracking-wide font-bold">
            Flagship Creations
          </h2>
          <p className="font-body text-muted-foreground text-sm max-w-md mx-auto mt-4">
            Curated scents crafted with precision and passion for those who demand distinction.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm font-body">
            Loading flagship perfumes...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPerfumes.map((product) => (
              <div key={product.id} className="glass-card rounded-2xl overflow-hidden glass-card-hover group flex flex-col justify-between">
                <div>
                  <div className="product-image-wrapper aspect-[4/5] overflow-hidden shimmer-gold">
                    <img
                      src={product.image_url}
                      alt={`${product.name} by RA Fragrance`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md border border-primary/30 text-primary text-[10px] tracking-[0.2em] uppercase font-body px-3 py-1 rounded-full">
                      {product.category} {product.badge ? `• ${product.badge}` : ""}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-foreground text-2xl tracking-wide font-semibold">{product.name}</h3>
                    <p className="font-body text-primary text-xs tracking-[0.2em] uppercase mt-1">{product.tagline}</p>
                    <p className="font-body text-muted-foreground text-xs mt-3 leading-relaxed">
                      {product.notes.top ? `Notes of ${product.notes.top}, ${product.notes.heart}, and ${product.notes.base}.` : "High concentration luxury fragrance."}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <a
                    href={`${WHATSAPP_LINK}&text=Hi%2C%20I%20want%20to%20order%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs w-full py-3 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={15} />
                    <span>Order {product.name}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/collection" className="btn-outline">
            View All {perfumes.length} Fragrances →
          </Link>
        </div>
      </section>

      {/* ORIGIN & BRAND STORY */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto glass-card rounded-[2.5rem] p-10 md:p-16 border border-primary/30 text-center relative gold-glow">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">Our Roots</p>
          <h2 className="font-display text-gold-gradient text-3xl sm:text-5xl tracking-wide mb-6">
            Born in Gujranwala 🇵🇰
          </h2>
          <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            RA Fragrance is a student-run luxury fragrance house rooted in Gujranwala. We bring high-end perfume formulations to scent lovers across Pakistan, delivering pure luxury at accessible prices.
          </p>
          <div className="mt-8">
            <Link to="/about" className="btn-outline text-xs">
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER & CONTACT */}
      <footer className="border-t border-primary/20 bg-card/80 pt-16 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="RA Fragrance" className="w-10 h-10 rounded-full object-contain border border-primary/40 p-0.5" />
              <span className="font-display text-gold-gradient text-xl tracking-[0.2em] font-bold uppercase">
                RA FRAGRANCE
              </span>
            </div>
            <p className="font-body text-muted-foreground text-xs leading-relaxed max-w-sm">
              The Essence of Elegance. Premium handcrafted fragrances delivering lasting power and undeniable impact across Pakistan.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-display text-primary text-sm tracking-[0.2em] uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-xs text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/collection" className="hover:text-primary transition-colors">Full Collection</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About RA Fragrance</Link></li>
              <li>
                <Link to="/admin" className="text-primary/80 hover:text-primary transition-colors inline-flex items-center gap-1">
                  <Shield size={12} />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-display text-primary text-sm tracking-[0.2em] uppercase mb-4">Direct Contact & Orders</h4>
            <div className="space-y-3 font-body text-xs text-muted-foreground">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <MessageCircle size={16} className="text-primary" />
                <span>WhatsApp Order: +92 332 5553408</span>
              </a>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={16} className="text-primary" />
                <span>Direct Call: {PHONE_NUMBER}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-muted-foreground text-xs">
          <p>RA FRAGRANCE © {new Date().getFullYear()} — The Essence of Elegance. All Rights Reserved.</p>
          <Link to="/admin" className="text-primary/70 hover:text-primary transition-colors text-[11px] uppercase tracking-wider">
            Admin Management
          </Link>
        </div>
      </footer>
    </main>
  );
};

export default Index;
