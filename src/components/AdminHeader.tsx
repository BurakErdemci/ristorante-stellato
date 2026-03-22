"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";

const ADMIN_ROUTE = process.env.NEXT_PUBLIC_ADMIN_ROUTE || "admin";

export default function AdminHeader() {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => signOut({ callbackUrl: `/${ADMIN_ROUTE}/login` })}
      className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest text-theme-muted border border-theme-border rounded-lg hover:border-red-500/30 hover:text-red-400 transition-all"
    >
      <LogOut size={14} />
      {t.admin.logout}
    </button>
  );
}
