import Link from "next/link";
import XpBadge from "@/components/stats/XpBadge";
import StreakBadge from "@/components/stats/StreakBadge";
import HeartsDisplay from "@/components/hearts/HeartsDisplay";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
      <Link href="/" className="font-heading text-xl font-extrabold text-brand-green">
        Grana+
      </Link>
      <div className="flex items-center gap-2">
        <StreakBadge />
        <XpBadge />
        <HeartsDisplay />
        <Link
          href="/perfil"
          className="ml-2 rounded-full bg-brand-dark px-3 py-1 text-sm font-bold text-white"
        >
          Perfil
        </Link>
      </div>
    </header>
  );
}
