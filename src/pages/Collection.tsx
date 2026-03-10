import perfume1 from "@/assets/perfume-1.jpg";
import perfume2 from "@/assets/perfume-2.jpg";
import perfume3 from "@/assets/perfume-3.jpg";

const products = [
  { id: 1, name: "Noir Essence", note: "Woody · Amber · Oud", image: perfume1 },
  { id: 2, name: "Golden Hour", note: "Citrus · Musk · Sandalwood", image: perfume2 },
  { id: 3, name: "Velvet Touch", note: "Rose · Vanilla · Leather", image: perfume3 },
];

const Collection = () => {
  return (
    <main className="bg-background text-foreground pt-24 pb-20 min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6">
        <header className="text-center mb-16 md:mb-24">
          <h1 className="font-display text-primary text-4xl md:text-6xl tracking-wide mb-4">
            The Collection
          </h1>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Each fragrance tells a different story. Find the one that speaks yours.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {products.map((product) => (
            <article key={product.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 bg-secondary/30">
                <img
                  src={product.image}
                  alt={`${product.name} — MeraScent fragrance`}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <h2 className="font-display text-foreground text-xl md:text-2xl tracking-wide mb-1">
                {product.name}
              </h2>
              <p className="font-body text-muted-foreground text-sm tracking-wider">
                {product.note}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center mt-20">
          <a
            href="https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20MeraScent%20fragrances!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground font-body font-semibold text-sm px-10 py-4 tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
          >
            Order on WhatsApp
          </a>
          <p className="font-body text-muted-foreground text-xs mt-4 tracking-wider">
            Or DM us on{" "}
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
