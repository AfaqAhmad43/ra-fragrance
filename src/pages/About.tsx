import { Clock, Sparkles, Zap, MapPin, MessageCircle, Instagram, Phone } from "lucide-react";
import logo from "@/assets/ra-fragrance-logo.png";

const WHATSAPP_LINK = "https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20RA%20Fragrance!";
const PHONE_NUMBER = "+92 332 5553408";
const INSTAGRAM_URL = "https://www.instagram.com/merascent";

const features = [
  {
    icon: Sparkles,
    title: "The New Standard",
    description: "We don't follow trends — we define them. RA Fragrance brings world-class perfumery standards to Pakistan, making pure luxury accessible.",
  },
  {
    icon: Clock,
    title: "Lasting Power",
    description: "Formulated with high concentrations of perfume oils, our scents are engineered for longevity and projection from morning until night.",
  },
  {
    icon: Zap,
    title: "Undeniable Impact",
    description: "Every RA Fragrance creation commands presence. A bold, memorable sillage designed to leave an impression before you even speak.",
  },
  {
    icon: MapPin,
    title: "Born in Gujranwala 🇵🇰",
    description: "Proudly Pakistani. We are a student-run luxury fragrance house rooted in the heart of Gujranwala, driven by passion and craftsmanship.",
  },
];

const About = () => {
  return (
    <main className="bg-background text-foreground pt-32 pb-24 min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Header */}
        <header className="text-center mb-20">
          <div className="relative w-28 h-28 mx-auto mb-8 rounded-full p-1 bg-gradient-to-b from-primary/60 via-primary/20 to-transparent shadow-xl gold-glow">
            <img
              src={logo}
              alt="RA Fragrance Logo"
              className="w-full h-full object-contain rounded-full bg-card/90"
            />
          </div>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Our Heritage & Vision</p>
          <h1 className="font-display text-gold-gradient text-4xl sm:text-6xl tracking-wide font-bold mb-4">
            Why RA Fragrance?
          </h1>
          <p className="font-display text-lg text-muted-foreground tracking-[0.2em] uppercase mb-6">
            The Essence of Elegance
          </p>
          <p className="font-body text-foreground/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded with a passion for fine perfumery, RA Fragrance blends modern sophistication with uncompromising quality. What started as a student-led ambition in Gujranwala has evolved into a premier Pakistani fragrance brand.
          </p>
        </header>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-8 glass-card-hover border border-primary/20 flex flex-col justify-between"
            >
              <div>
                <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/30 text-primary inline-block mb-5 shadow-inner">
                  <feature.icon size={26} strokeWidth={1.75} />
                </div>
                <h2 className="font-display text-foreground text-2xl mb-3 tracking-wide font-semibold">
                  {feature.title}
                </h2>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <section className="glass-card rounded-3xl p-10 md:p-16 text-center mb-20 border border-primary/30 relative overflow-hidden gold-glow">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">Our Commitment</p>
          <h2 className="font-display text-gold-gradient text-3xl md:text-5xl tracking-wide font-bold mb-6">
            Wear the Scent that<br />Speaks For You.
          </h2>
          <p className="font-body text-foreground/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Every bottle we craft carries intention, premium ingredients, and the spirit of an ambitious generation. RA Fragrance isn't just a perfume — it's your personal signature.
          </p>
        </section>

        {/* CTAs */}
        <div className="glass-card rounded-2xl p-10 text-center">
          <h2 className="font-display text-gold-gradient text-2xl md:text-4xl tracking-wide font-bold mb-6">
            Ready to Experience RA Fragrance?
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Order on WhatsApp</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs flex items-center gap-2"
            >
              <Instagram size={16} />
              <span>Follow on Instagram</span>
            </a>
          </div>
          <div className="mt-8 font-body text-muted-foreground text-xs flex items-center justify-center gap-6 flex-wrap">
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={14} className="text-primary" />
              <span>Call: {PHONE_NUMBER}</span>
            </a>
            <span>•</span>
            <span>Gujranwala, Punjab, Pakistan</span>
          </div>
        </div>

      </div>
    </main>
  );
};

export default About;
