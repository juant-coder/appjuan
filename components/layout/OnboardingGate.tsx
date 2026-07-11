"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function OnboardingGate() {
  const onboarded = useAppStore((s) => s.onboarded);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && !onboarded) {
      router.replace("/onboarding");
    }
  }, [mounted, onboarded, router]);

  return null;
}
