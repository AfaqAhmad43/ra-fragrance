import playBoyz from "@/assets/play-boyz.jpeg";
import elegant from "@/assets/elegant.jpeg";
import twinkleQueen from "@/assets/twinkle-queen.jpeg";
import glowingGirl from "@/assets/glowing-girl.jpeg";
import sportsMania from "@/assets/sports-mania.jpeg";
import primeScent from "@/assets/prime-scent.jpeg";
import everwake from "@/assets/everwake.jpeg";

const products = [
  { name: "Prime Scent", category: "Unisex", image: primeScent },
  { name: "Everwake", category: "Unisex", image: everwake },
  { name: "Play Boyz", category: "For Him", image: playBoyz },
  { name: "Elegant", category: "For Him", image: elegant },
  { name: "Twinkle Queen", category: "For Her", image: twinkleQueen },
  { name: "Glowing Girl", category: "For Her", image: glowingGirl },
  { name: "Sports Mania", category: "For Him", image: sportsMania },
];

const Collection = () => {
  return (
    <main className="bg-background text-foreground pt-28 pb-20 min-h-screen">
      <div className="max-w-[1100px] mx-auto px-6">
        <header className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Our Fragrances</p>
          <h1 className="font-display text-primary text-4xl md:text-6xl tracking-wide mb-4">
            The Collection
          </h1>
          <p className="font-body text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Each scent tells a different story. Find the one that speaks yours.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <article key={product.name} className="group">
              <div className="product-image-wrapper bg-card rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.name} — MeraScent`}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 px-1">
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">{product.category}</p>
                <h2 className="font-display text-foreground text-lg md:text-xl tracking-wide">
                  {product.name}
                </h2>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-20">
          <a
            href="https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20MeraScent%20fragrances!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Order on WhatsApp
          </a>
          <p className="font-body text-muted-foreground text-xs mt-4 tracking-wider">
            Or DM on{" "}
            <a href="https://www.instagram.com/merascent" target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-80 transition-opacity">
              Instagram
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Collection;
