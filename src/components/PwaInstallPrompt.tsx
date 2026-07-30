import { useState, useEffect } from "react";
import { Download, X, Sparkles } from "lucide-react";
import logo from "@/assets/ra-fragrance-logo.png";

export const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 md:left-auto md:right-5 md:max-w-sm z-50 animate-fade-in">
      <div className="glass-card rounded-2xl p-4 border border-primary/40 gold-glow shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-primary/40 p-0.5 bg-card shrink-0">
            <img src={logo} alt="RA Fragrance" className="w-full h-full object-contain rounded-full" />
          </div>
          <div>
            <h4 className="font-display text-gold-gradient text-sm font-semibold leading-tight">
              Install RA Fragrance
            </h4>
            <p className="text-[11px] text-muted-foreground font-body">
              Add to Home Screen for fast mobile access.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="btn-primary text-[11px] px-3.5 py-1.5 flex items-center gap-1.5 shrink-0"
          >
            <Download size={13} />
            <span>Install</span>
          </button>
          
          <button
            onClick={() => setShowPrompt(false)}
            className="text-muted-foreground hover:text-foreground p-1 rounded-full border border-border/40"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;
