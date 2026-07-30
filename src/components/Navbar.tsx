import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, MessageCircle, ShieldCheck } from "lucide-react";
import logo from "@/assets/ra-fragrance-logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "About Us" },
  { to: "/admin", label: "Admin Portal" },
];

const WHATSAPP_LINK = "https://wa.me/923325553408?text=Hi%2C%20I%27m%20interested%20in%20RA%20Fragrance!";

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-primary/20 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-3.5">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/40 p-0.5 bg-card/80 group-hover:border-primary transition-all duration-300 shadow-md shadow-primary/10">
            <img src={logo} alt="RA Fragrance Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-gold-gradient text-base md:text-lg tracking-[0.2em] font-bold uppercase leading-tight group-hover:opacity-90 transition-opacity">
              RA FRAGRANCE
            </span>
            <span className="font-display text-[9px] md:text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              The Essence of Elegance
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-body text-xs tracking-[0.2em] uppercase transition-all duration-300 py-1 hover:text-primary ${
                  pathname.startsWith(link.to) && (link.to !== "/" || pathname === "/")
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
                {pathname.startsWith(link.to) && (link.to !== "/" || pathname === "/") && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </div>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>Order Scent</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground p-2 rounded-lg border border-primary/20 bg-card/50 hover:border-primary/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} className="text-primary" /> : <Menu size={20} className="text-primary" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-2xl border-b border-primary/30 px-6 pt-4 pb-6 space-y-4 animate-fade-in">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block font-body text-sm tracking-[0.2em] uppercase py-2.5 px-3 rounded-lg transition-colors ${
                  pathname.startsWith(link.to) && (link.to !== "/" || pathname === "/")
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-border/40">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs w-full justify-center flex items-center gap-2 py-3"
            >
              <MessageCircle size={16} />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
