"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export default function BottomNav() {
  const pathname = usePathname() ?? "/";
  const avatar = useAppStore((s) => s.avatar);
  const onPerfil = pathname.startsWith("/perfil");

  const tabClass = (active: boolean) =>
    `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-extrabold uppercase tracking-wide transition-colors ${
      active ? "text-brand-green" : "text-slate-400 dark:text-slate-500"
    }`;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-black/5 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#0b0b16]/90"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-md">
        <Link href="/" className={tabClass(!onPerfil)}>
          <span className="text-2xl leading-none">📈</span>
          Trilha
        </Link>
        <Link href="/perfil" className={tabClass(onPerfil)}>
          <span className="text-2xl leading-none">{avatar}</span>
          Perfil
        </Link>
      </div>
    </nav>
  );
}
