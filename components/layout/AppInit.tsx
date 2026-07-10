"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function AppInit() {
  const hydrateOnLoad = useAppStore((s) => s.hydrateOnLoad);
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    hydrateOnLoad();
  }, [hydrateOnLoad]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
}
