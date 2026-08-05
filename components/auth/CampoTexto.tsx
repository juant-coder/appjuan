"use client";

import type { InputHTMLAttributes } from "react";

export default function CampoTexto({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-4 py-3 font-semibold outline-none transition-colors focus:border-brand-green disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800"
      />
    </label>
  );
}
