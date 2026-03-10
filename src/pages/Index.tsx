import logo from "@/assets/merascent-logo.jpeg";
import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";

const WHATSAPP_LINK = "https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20MeraScent%20fragrances!";
const PHONE_NUMBER = "+92 332 5553408";
const INSTAGRAM_URL = "https://www.instagram.com/merascent";

const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* HERO — Logo reveal */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6" aria-label="Hero">
        <img
          src={logo}
          alt="MeraScent logo — MS monogram in gold"
          className="w-40 h-40 md:w-56 md:h-56 object-contain animate-fade-in rounded-full"
        />
        <h1 className="font-display text-primary text-2xl md:text-4xl tracking-widest mt-8 animate-fade-in-delayed text-center">
          The new standard in fragrance.
        </h1>
      </section>

      {/* PRODUCT IMAGE 1 */}
      <section className="section-image" aria-label="Product showcase">
        <img
          src={perfume1}
          alt="MeraScent luxury perfume bottle with amber tones"
          className="w-full max-w-[700px] mx-auto object-cover"
          loading="lazy"
        />
      </section>

      {/* CLAIM: Lasting Power */}
      <section className="section-claim" aria-label="Lasting power">
        <h2 className="font-display text-primary text-3xl md:text-5xl tracking-wide text-center">
          Lasting power.
        </h2>
      </section>

      {/* PRODUCT IMAGE 2 */}
      <section className="section-image" aria-label="Product collection">
        <img
          src={perfume2}
          alt="MeraScent perfume bottle collection with golden light"
          className="w-full max-w-[700px] mx-auto object-cover"
          loading="lazy"
        />
      </section>

      {/* CLAIM: Undeniable Impact */}
      <section className="section-claim" aria-label="Undeniable impact">
        <h2 className="font-display text-primary text-3xl md:text-5xl tracking-wide text-center">
          Undeniable impact.
        </h2>
      </section>

      {/* PRODUCT IMAGE 3 */}
      <section className="section-image" aria-label="Product detail">
        <img
          src={perfume3}
          alt="MeraScent perfume spray detail in golden light"
          className="w-full max-w-[700px] mx-auto object-cover"
          loading="lazy"
        />
      </section>

      {/* PARCHMENT SECTION — Origin Story */}
      <section className="section-parchment py-24 md:py-32 px-6" aria-label="Our story">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl tracking-wide mb-8">
            Born in Gujranwala. 🇵🇰
          </h2>
          <p className="font-body text-lg md:text-xl leading-relaxed opacity-80">
            MeraScent is a student-run fragrance house rooted in the heart of Punjab.
            Every bottle is crafted with intention — blending modern sophistication
            with the warmth and pride of our origins.
          </p>
        </div>
      </section>

      {/* CONTACT / ORDER SECTION */}
      <section className="bg-background py-24 md:py-32 px-6" aria-label="Order now">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-display text-primary text-3xl md:text-5xl tracking-wide mb-12">
            Make it yours.
          </h2>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground font-body font-semibold text-lg px-10 py-4 tracking-wider hover:opacity-90 transition-opacity mb-8"
          >
            Order on WhatsApp
          </a>

          <div className="mt-12 space-y-4 font-body text-muted-foreground text-sm md:text-base">
            <p>
              Call or text:{" "}
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="text-primary hover:opacity-80 transition-opacity">
                {PHONE_NUMBER}
              </a>
            </p>
            <p>
              DM on Instagram:{" "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-80 transition-opacity">
                @merascent
              </a>
            </p>
          </div>

          <div className="mt-20 pt-8 border-t border-border">
            <p className="font-body text-muted-foreground text-xs tracking-widest uppercase">
              MeraScent © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
