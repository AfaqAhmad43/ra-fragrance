import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import logo from "@/assets/ra-fragrance-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route accessed:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <div className="glass-card rounded-3xl p-10 md:p-14 max-w-md border border-primary/30 gold-glow">
        <img src={logo} alt="RA Fragrance Logo" className="w-20 h-20 rounded-full mx-auto mb-6 border border-primary/40 p-0.5 object-contain" />
        <h1 className="font-display text-gold-gradient text-6xl font-bold mb-2">404</h1>
        <h2 className="font-display text-lg text-primary tracking-[0.2em] uppercase mb-4">Scent Not Found</h2>
        <p className="font-body text-xs text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary text-xs">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
