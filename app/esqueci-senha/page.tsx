"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { traduzErroAuth } from "@/lib/auth/errors";
import AuthShell from "@/components/auth/AuthShell";
import CampoTexto from "@/components/auth/CampoTexto";
import BotaoPrimario from "@/components/auth/BotaoPrimario";
import Alerta from "@/components/auth/Alerta";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/confirmar?next=/redefinir-senha`,
    });

    if (error) {
      setErro(traduzErroAuth(error.message));
      setCarregando(false);
      return;
    }

    setEnviado(true);
    setCarregando(false);
  }

  if (enviado) {
    return (
      <AuthShell
        titulo="E-mail a caminho! 📬"
        subtitulo="Enviamos um link de recuperação para o seu e-mail."
        rodape={
          <Link href="/login" className="text-brand-green">
            Voltar para o login
          </Link>
        }
      >
        <Alerta tipo="sucesso">
          Se existir uma conta para <strong>{email.trim()}</strong>, o link chegará em instantes. Ele
          abre direto o app para você definir a nova senha e vale por 1 hora.
        </Alerta>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Não chegou? Confira a caixa de spam ou{" "}
          <button
            type="button"
            onClick={() => setEnviado(false)}
            className="font-bold text-brand-green"
          >
            tente outro e-mail
          </button>
          .
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      titulo="Recuperar acesso"
      subtitulo="Informe seu e-mail e enviamos um link para criar uma nova senha."
      rodape={
        <span className="text-slate-500 dark:text-slate-400">
          Lembrou a senha?{" "}
          <Link href="/login" className="text-brand-green">
            Entrar
          </Link>
        </span>
      }
    >
      <form onSubmit={enviar} className="flex flex-col gap-4">
        {erro && <Alerta tipo="erro">{erro}</Alerta>}

        <CampoTexto
          label="E-mail da conta"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          autoComplete="email"
          inputMode="email"
          required
          disabled={carregando}
        />

        <BotaoPrimario type="submit" carregando={carregando} disabled={!email.trim()}>
          ENVIAR LINK DE RECUPERAÇÃO
        </BotaoPrimario>
      </form>
    </AuthShell>
  );
}
