/** Traduz mensagens de erro do Supabase Auth para português. */
export function traduzErroAuth(mensagem: string): string {
  const m = mensagem.toLowerCase();

  if (m.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.";
  if (m.includes("user already registered") || m.includes("already been registered"))
    return "Este e-mail já possui conta. Tente entrar ou recuperar a senha.";
  if (m.includes("password should be at least")) return "A senha precisa ter pelo menos 8 caracteres.";
  if (m.includes("unable to validate email") || m.includes("invalid email")) return "E-mail inválido.";
  if (m.includes("for security purposes") || m.includes("rate limit") || m.includes("too many"))
    return "Muitas tentativas em pouco tempo. Aguarde alguns instantes e tente de novo.";
  if (m.includes("new password should be different"))
    return "A nova senha precisa ser diferente da anterior.";
  if (m.includes("token has expired") || m.includes("invalid token") || m.includes("expired"))
    return "Este link expirou. Solicite um novo e-mail de recuperação.";

  return "Não foi possível concluir. Tente novamente em instantes.";
}
