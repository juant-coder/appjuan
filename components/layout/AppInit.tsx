"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function AppInit() {
  const hydrateOnLoad = useAppStore((s) => s.hydrateOnLoad);

  useEffect(() => {
    hydrateOnLoad();
  }, [hydrateOnLoad]);

  return null;
}
