import logo from "@/assets/merascent-logo.jpeg";
import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";
import { Link } from "react-router-dom";

const WHATSAPP_LINK = "https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20MeraScent%20fragrances!";
const PHONE_NUMBER = "+92 332 5553408";
const INSTAGRAM_URL = "https://www.instagram.com/merascent";

const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16" aria-label="Hero">
        <img
          src={logo}
          alt="MeraScent logo"
          className="w-36 h-36 md:w-48 md:h-48 object-contain animate-fade-in rounded-full"
        />
        <h1 className="font-display text-primary text-2xl md:text-5xl tracking-wide mt-8 animate-fade-in-delayed text-center leading-tight">
          The new standard in fragrance.
        </h1>
        <div className="animate-fade-in-late mt-10 flex gap-4">
          <Link
            to="/collection"
            className="font-body text-sm tracking-[0.2em] uppercase border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Explore
          </Link>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity"
          >
            Order
          </a>
        </div>
      </section>

      {/* PRODUCT IMAGE 1 + Claim */}
      <section className="max-w-[700px] mx-auto px-6 py-16 md:py-24">
        <img src={perfume1} alt="MeraScent luxury perfume" className="w-full object-cover mb-12" loading="lazy" />
        <h2 className="font-display text-primary text-3xl md:text-5xl tracking-wide text-center">
          Lasting power.
        </h2>
      </section>

      {/* PRODUCT IMAGE 2 + Claim */}
      <section className="max-w-[700px] mx-auto px-6 py-16 md:py-24">
        <img src={perfume2} alt="MeraScent collection" className="w-full object-cover mb-12" loading="lazy" />
        <h2 className="font-display text-primary text-3xl md:text-5xl tracking-wide text-center">
          Undeniable impact.
        </h2>
      </section>

      {/* PRODUCT IMAGE 3 */}
      <section className="max-w-[700px] mx-auto px-6 py-16 md:py-24">
        <img src={perfume3} alt="MeraScent detail" className="w-full object-cover" loading="lazy" />
      </section>

      {/* ORIGIN — Parchment */}
      <section className="section-parchment py-24 md:py-32 px-6" aria-label="Our story">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl tracking-wide mb-8">
            Born in Gujranwala. 🇵🇰
          </h2>
          <p className="font-body text-lg md:text-xl leading-relaxed opacity-70">
            A student-run fragrance house from the heart of Punjab — blending
            modern sophistication with the warmth of our roots.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-background py-24 md:py-32 px-6" aria-label="Order">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="font-display text-primary text-3xl md:text-5xl tracking-wide mb-10">
            Make it yours.
          </h2>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground font-body font-semibold text-sm px-10 py-4 tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
          >
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
