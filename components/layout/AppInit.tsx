"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import type { AppStore } from "@/types/store";
import { createClient } from "@/lib/supabase/client";
import {
  pickSyncedState,
  pullProgress,
  pushProgress,
} from "@/lib/supabase/progress";

const SYNC_DEBOUNCE_MS = 1200;

export default function AppInit() {
  const hydrateOnLoad = useAppStore(
    (state: AppStore) => state.hydrateOnLoad,
  );

  const theme = useAppStore(
    (state: AppStore) => state.theme,
  );

  const userIdRef = useRef<string | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    );
  }, [theme]);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    async function start() {
      try {
        const supabase = createClient();

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("Erro ao obter usuário:", userError);
          hydrateOnLoad();
          return;
        }

        if (cancelled) return;

        if (!user) {
          console.warn(
            "Sincronização não iniciada: usuário não autenticado.",
          );

          hydrateOnLoad();
          return;
        }

        console.log("Iniciando sincronização para:", user.id);

        userIdRef.current = user.id;

        const remote = await pullProgress(user.id);

        if (cancelled) return;

        if (remote) {
          console.log("Progresso encontrado na nuvem:", remote);

          useAppStore.setState(remote);
        } else {
          console.log(
            "Nenhum progresso remoto. Criando primeiro registro.",
          );

          await pushProgress(
            user.id,
            pickSyncedState(useAppStore.getState()),
          );
        }

        hydrateOnLoad();
        initializedRef.current = true;

        unsubscribe = useAppStore.subscribe(
          (state: AppStore) => {
            if (!initializedRef.current) return;
            if (!userIdRef.current) return;

            if (debounceTimer) {
              clearTimeout(debounceTimer);
            }

            debounceTimer = setTimeout(() => {
              const userId = userIdRef.current;

              if (!userId) return;

              void pushProgress(
                userId,
                pickSyncedState(state),
              ).catch((error: unknown) => {
                console.error(
                  "Falha no sincronismo automático:",
                  error,
                );
              });
            }, SYNC_DEBOUNCE_MS);
          },
        );
      } catch (error: unknown) {
        console.error(
          "Erro ao iniciar sincronização:",
          error,
        );

        hydrateOnLoad();
      }
    }

    void start();

    return () => {
      cancelled = true;
      initializedRef.current = false;
      userIdRef.current = null;

      if (unsubscribe) {
        unsubscribe();
      }

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [hydrateOnLoad]);

  return null;
}