import { createClient } from "@/lib/supabase/client";
import type { AppState } from "@/types/store";

export const SYNCED_KEYS = [
  "xp",
  "streak",
  "lastActiveDate",
  "hearts",
  "heartsUpdatedAt",
  "progress",
  "badges",
  "history",
  "focus",
  "unlockedUpTo",
  "onboarded",
] as const;

export type SyncedState = Pick<
  AppState,
  (typeof SYNCED_KEYS)[number]
>;

export function pickSyncedState(
  state: AppState,
): SyncedState {
  const out = {} as SyncedState;

  for (const key of SYNCED_KEYS) {
    (out as Record<string, unknown>)[key] = state[key];
  }

  return out;
}

export async function pullProgress(
  userId: string,
): Promise<SyncedState | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_progress")
    .select(`
      xp,
      streak,
      last_active_date,
      hearts,
      hearts_updated_at,
      progress,
      badges,
      history,
      focus,
      unlocked_up_to,
      onboarded
    `)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar progresso:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    xp: data.xp ?? 0,
    streak: data.streak ?? 0,
    lastActiveDate: data.last_active_date ?? null,
    hearts: data.hearts ?? 5,
    heartsUpdatedAt: data.hearts_updated_at ?? null,
    progress: data.progress ?? {},
    badges: data.badges ?? [],
    history: data.history ?? [],
    focus: data.focus ?? [],
    unlockedUpTo: data.unlocked_up_to ?? 0,
    onboarded: Boolean(data.onboarded),
  };
}

export async function pushProgress(
  userId: string,
  state: SyncedState,
): Promise<void> {
  const supabase = createClient();

  const payload = {
    user_id: userId,
    xp: state.xp,
    streak: state.streak,
    last_active_date: state.lastActiveDate ?? null,
    hearts: state.hearts,
    hearts_updated_at: state.heartsUpdatedAt ?? null,
    progress: state.progress ?? {},
    badges: state.badges ?? [],
    history: state.history ?? [],
    focus: state.focus ?? [],
    unlocked_up_to: state.unlockedUpTo,
    onboarded: state.onboarded,
  };

  console.log(
    "Enviando progresso ao Supabase:",
    payload,
  );

  const { data, error } = await supabase
    .from("user_progress")
    .upsert(payload, {
      onConflict: "user_id",
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao sincronizar progresso:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      payload,
    });

    throw error;
  }

  console.log(
    "Progresso sincronizado com sucesso:",
    data,
  );
}