import { Clock, Sparkles, Zap, MapPin } from "lucide-react";
import logo from "@/assets/merascent-logo.jpeg";

const features = [
  {
    icon: Sparkles,
    title: "The New Standard",
    description: "We don't follow trends — we set them. MeraScent brings world-class fragrance quality to Pakistan at a price that makes luxury accessible.",
  },
  {
    icon: Clock,
    title: "Lasting Power",
    description: "Our carefully crafted formulations are designed for longevity. One application carries you confidently from morning through night.",
  },
  {
    icon: Zap,
    title: "Undeniable Impact",
    description: "Every MeraScent fragrance is engineered to turn heads. Bold sillage that leaves a lasting impression wherever you go.",
  },
  {
    icon: MapPin,
    title: "Born in Gujranwala",
    description: "Proudly Pakistani, proudly Punjab. We're a student-run brand rooted in the heart of Gujranwala, building something bigger than ourselves.",
  },
];

const About = () => {
  return (
    <main className="bg-background text-foreground pt-28 pb-20 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-20">
          <img
            src={logo}
            alt="MeraScent logo"
            className="w-20 h-20 object-contain rounded-full mx-auto mb-8 gold-glow"
          />
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Our Story</p>
          <h1 className="font-display text-primary text-4xl md:text-6xl tracking-wide mb-6">
            Why MeraScent?
          </h1>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            We started with a simple belief: premium fragrance shouldn't cost a fortune.
            What began as a passion project between students has grown into something
            we're truly proud of.
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card rounded-2xl p-8 hover:border-primary/30 transition-colors duration-300">
              <feature.icon className="text-primary mb-4" size={28} strokeWidth={1.5} />
              <h2 className="font-display text-foreground text-xl mb-3 tracking-wide">
                {feature.title}
              </h2>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <section className="section-parchment rounded-3xl p-10 md:p-16 text-center mb-20">
          <p className="font-body text-xs tracking-[0.3em] uppercase opacity-50 mb-4">Our Mission</p>
          <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-6">
            Wear the scent that<br />speaks for you.
          </h2>
          <p className="font-body text-sm md:text-base opacity-70 max-w-md mx-auto leading-relaxed">
            Every bottle we craft carries intention, quality, and the spirit of a
            generation that refuses to settle. MeraScent is more than fragrance —
            it's identity.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-display text-primary text-2xl md:text-4xl tracking-wide mb-8">
            Ready to find your scent?
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20MeraScent%20fragrances!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Order on WhatsApp
            </a>
            <a
              href="https://www.instagram.com/merascent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Follow on Instagram
            </a>
          </div>
          <p className="font-body text-muted-foreground text-xs mt-6">
            Call or text: <a href="tel:+923325553408" className="text-primary">+92 332 5553408</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
