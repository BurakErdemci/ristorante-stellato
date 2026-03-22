"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/LanguageProvider";

const ADMIN_ROUTE = process.env.NEXT_PUBLIC_ADMIN_ROUTE || "admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(t.adminLogin.invalidCredentials);
      setLoading(false);
    } else {
      router.push(`/${ADMIN_ROUTE}`);
      router.refresh();
    }
  };

  return (
    <main className="force-dark min-h-screen bg-stellato-black flex items-center justify-center px-4">
      {/* Arkaplan efekti */}
      <div className="fixed inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo / Başlık */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-white tracking-wide">
            {t.adminLogin.brand} <span className="text-stellato-gold">Stellato</span>
          </h1>
          <div className="w-16 h-[1px] bg-stellato-gold/50 mx-auto mt-4 mb-3" />
          <p className="text-stone-500 text-xs uppercase tracking-[0.3em]">
            {t.adminLogin.title}
          </p>
        </div>

        {/* Form Kartı */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-stellato-gold/10 rounded-lg">
              <Lock size={18} className="text-stellato-gold" />
            </div>
            <div>
              <h2 className="text-white font-serif text-lg">{t.adminLogin.subtitle}</h2>
              <p className="text-stone-500 text-xs">{t.adminLogin.authRequired}</p>
            </div>
          </div>

          {/* Hata mesajı */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-widest mb-2">
                {t.adminLogin.emailLabel}
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t.adminLogin.emailPlaceholder}
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:border-stellato-gold focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Şifre */}
            <div>
              <label className="block text-stone-400 text-xs uppercase tracking-widest mb-2">
                {t.adminLogin.passwordLabel}
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white text-sm focus:border-stellato-gold focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Giriş Butonu */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stellato-gold text-black font-bold py-3 rounded-lg text-sm uppercase tracking-widest hover:bg-[#e5c04b] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-stellato-gold/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  {t.adminLogin.loggingIn}
                </span>
              ) : (
                t.adminLogin.loginButton
              )}
            </button>
          </form>
        </div>

        {/* Alt bilgi */}
        <p className="text-center text-stone-600 text-[10px] uppercase tracking-widest mt-6">
          {t.adminLogin.staffOnly}
        </p>
      </motion.div>
    </main>
  );
}
