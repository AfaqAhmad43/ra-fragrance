import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/ra-fragrance-logo.png";
import { Lock, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const AdminLogin = () => {
  const [email, setEmail] = useState("ahmedkhanra360@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // If Supabase Auth is configured, try Supabase login
    if (isSupabaseConfigured && supabase) {
      const { error: sbError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (sbError) {
        setError(sbError.message);
        setLoading(false);
        return;
      }

      sessionStorage.setItem("ra_admin_auth", "true");
      navigate("/admin");
      return;
    }

    // Default Fallback Authentication for local/development mode
    const isValidAdmin =
      (cleanEmail === "ahmedkhanra360@gmail.com" && cleanPassword === "pass123") ||
      cleanPassword === "admin123" ||
      cleanPassword === "pass123";

    if (isValidAdmin) {
      sessionStorage.setItem("ra_admin_auth", "true");
      navigate("/admin");
    } else {
      setError("Invalid Email or Password. Check your credentials.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md glass-card rounded-3xl p-8 md:p-10 border border-primary/30 gold-glow relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-b from-primary/60 via-primary/20 to-transparent shadow-xl mx-auto mb-4 border border-primary/40">
            <img src={logo} alt="RA Fragrance Logo" className="w-full h-full object-contain rounded-full bg-card/90" />
          </div>
          <h1 className="font-display text-gold-gradient text-2xl md:text-3xl font-bold tracking-wide">
            Admin Portal
          </h1>
          <p className="font-body text-xs text-muted-foreground tracking-[0.2em] uppercase mt-1">
            RA FRAGRANCE MANAGEMENT
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs text-center font-body">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 font-body">
          
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5 font-medium">
              <Mail size={14} className="text-primary" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ahmedkhanra360@gmail.com"
              required
              className="w-full bg-card/80 border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-foreground"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5 font-medium">
              <Lock size={14} className="text-primary" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full bg-card/80 border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-xs w-full py-3.5 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>Access Admin Portal</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
