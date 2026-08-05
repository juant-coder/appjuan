import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthShell({
  titulo,
  subtitulo,
  children,
  rodape,
}: {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
  rodape?: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <header className="text-center">
        <Link href="/" className="text-5xl" aria-label="Grana+">
          📈
        </Link>
        <h1 className="mt-2 font-heading text-2xl font-extrabold">{titulo}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitulo}</p>
      </header>

      {children}

      {rodape && <div className="text-center text-sm font-bold">{rodape}</div>}

      <p className="text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
        Conteúdo exclusivamente educacional — o Grana+ não faz recomendação de investimentos.
      </p>
    </div>
  );
}
