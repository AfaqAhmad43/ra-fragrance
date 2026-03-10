import logo from "@/assets/merascent-logo.jpeg";
import primeScent from "@/assets/prime-scent.jpeg";
import everwake from "@/assets/everwake.jpeg";
import playBoyz from "@/assets/play-boyz.jpeg";
import { Link } from "react-router-dom";

const WHATSAPP_LINK = "https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20MeraScent%20fragrances!";
const PHONE_NUMBER = "+92 332 5553408";
const INSTAGRAM_URL = "https://www.instagram.com/merascent";

const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={logo}
            alt="MeraScent logo"
            className="w-32 h-32 md:w-44 md:h-44 object-contain animate-fade-in rounded-full gold-glow"
          />
          <h1 className="font-display text-primary text-3xl md:text-6xl tracking-wide mt-10 animate-fade-in-delayed text-center leading-tight">
            The new standard<br />in fragrance.
          </h1>
          <p className="font-body text-muted-foreground text-sm md:text-base mt-5 animate-fade-in-delayed tracking-wider">
            Silence fades. Scent stays.
          </p>
          <div className="animate-fade-in-late mt-10 flex gap-4 flex-wrap justify-center">
            <Link to="/collection" className="btn-outline">
              Explore
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Order Now
            </a>
          </div>
        </div>
      </section>

      {/* HERO IMAGE — Prime Scent */}
      <section className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
        <div className="product-image-wrapper gold-glow">
          <img src={primeScent} alt="Prime Scent by MeraScent" className="w-full object-cover rounded-2xl" loading="lazy" />
        </div>
        <h2 className="font-display text-primary text-3xl md:text-5xl tracking-wide text-center mt-12">
          Lasting power.
        </h2>
        <p className="font-body text-muted-foreground text-center text-sm mt-3 tracking-wider">
          A memory in every drop.
        </p>
      </section>

      {/* HERO IMAGE — Everwake */}
      <section className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
        <div className="product-image-wrapper gold-glow">
          <img src={everwake} alt="Everwake by MeraScent" className="w-full object-cover rounded-2xl" loading="lazy" />
        </div>
        <h2 className="font-display text-primary text-3xl md:text-5xl tracking-wide text-center mt-12">
          Undeniable impact.
        </h2>
        <p className="font-body text-muted-foreground text-center text-sm mt-3 tracking-wider">
          Bold. Confident. Unforgettable.
        </p>
      </section>

      {/* HERO IMAGE — Play Boyz */}
      <section className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
        <div className="product-image-wrapper">
          <img src={playBoyz} alt="Play Boyz by MeraScent" className="w-full object-cover rounded-2xl" loading="lazy" />
        </div>
      </section>

      {/* ORIGIN — Parchment */}
      <section className="section-parchment py-20 md:py-28 px-6 rounded-t-[3rem]">
        <div className="max-w-[600px] mx-auto text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase opacity-50 mb-6">Our Roots</p>
          <h2 className="font-display text-3xl md:text-5xl tracking-wide mb-6">
            Born in Gujranwala 🇵🇰
          </h2>
          <p className="font-body text-base md:text-lg leading-relaxed opacity-70">
            A student-run fragrance house from the heart of Punjab — blending
            modern sophistication with the warmth and pride of our origins.
          </p>
          <Link to="/about" className="inline-block mt-8 font-body text-xs tracking-[0.2em] uppercase text-parchment-foreground/60 border-b border-parchment-foreground/30 pb-1 hover:text-parchment-foreground hover:border-parchment-foreground/60 transition-colors">
            Our Story →
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-background py-20 md:py-28 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-display text-primary text-3xl md:text-5xl tracking-wide mb-10">
            Make it yours.
          </h2>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-12 py-4">
            Order on WhatsApp
          </a>

          <div className="mt-10 space-y-3 font-body text-muted-foreground text-sm">
            <p>
              Call:{" "}
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="text-primary hover:opacity-80 transition-opacity">
                {PHONE_NUMBER}
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-80 transition-opacity">
                @merascent
              </a>
            </p>
          </div>

          <div className="mt-16 pt-6 border-t border-border/40">
            <p className="font-body text-muted-foreground text-xs tracking-[0.2em] uppercase">
              MeraScent © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
