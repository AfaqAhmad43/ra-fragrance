import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-primary text-xl tracking-[0.3em] uppercase hover:opacity-80 transition-opacity">
          MeraScent
        </Link>

        <div className="flex items-center gap-8 font-body text-sm tracking-[0.15em] uppercase">
          <Link
            to="/"
            className={`transition-opacity hover:opacity-100 ${pathname === "/" ? "text-primary opacity-100" : "text-foreground/60 opacity-70"}`}
          >
            Home
          </Link>
          <Link
            to="/collection"
            className={`transition-opacity hover:opacity-100 ${pathname === "/collection" ? "text-primary opacity-100" : "text-foreground/60 opacity-70"}`}
          >
            Collection
          </Link>
          <a
            href="https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20MeraScent%20fragrances!"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground bg-primary px-5 py-2 text-xs tracking-[0.2em] font-semibold hover:opacity-90 transition-opacity"
          >
            Order
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
