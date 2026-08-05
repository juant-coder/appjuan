import { createClient } from "@/lib/supabase/client";

type AnalyticsProperties = Record<
  string,
  string | number | boolean | null
>;

export async function trackEvent(
  eventName: string,
  properties: AnalyticsProperties = {},
) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.warn("Evento não registrado: usuário não autenticado.");
    return;
  }

  const { error } = await supabase
    .from("analytics_events")
    .insert({
      user_id: user.id,
      event_name: eventName,
      properties,
    });

  if (error) {
    console.error("Erro ao registrar evento:", error);
  }
}