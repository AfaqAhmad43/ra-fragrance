import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-primary text-lg tracking-[0.25em] uppercase hover:opacity-80 transition-opacity">
          MeraScent
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:text-primary ${
                pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20MeraScent%20fragrances!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs px-6 py-2.5"
          >
            Order Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30 px-6 pb-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block font-body text-sm tracking-[0.15em] uppercase py-2 transition-colors ${
                pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20MeraScent%20fragrances!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs w-full text-center mt-2"
          >
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
