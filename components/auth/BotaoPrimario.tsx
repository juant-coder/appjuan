"use client";

import type { ButtonHTMLAttributes } from "react";

export default function BotaoPrimario({
  carregando,
  children,
  ...props
}: { carregando?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={props.disabled || carregando}
      className="w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white transition-all active:translate-y-0.5 disabled:opacity-40"
    >
      {carregando ? "AGUARDE..." : children}
    </button>
  );
}
