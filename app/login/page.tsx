"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { traduzErroAuth } from "@/lib/auth/errors";
import AuthShell from "@/components/auth/AuthShell";
import CampoTexto from "@/components/auth/CampoTexto";
import BotaoPrimario from "@/components/auth/BotaoPrimario";
import Alerta from "@/components/auth/Alerta";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destino = searchParams.get("redirect") ?? "/";
  const contaCriada = searchParams.get("cadastro") === "ok";
  const senhaAlterada = searchParams.get("senha") === "ok";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });

    if (error) {
      setErro(traduzErroAuth(error.message));
      setCarregando(false);
      return;
    }

    router.replace(destino);
    router.refresh();
  }

  return (
    <AuthShell
      titulo="Bem-vindo de volta!"
      subtitulo="Entre para continuar sua trilha de investidor."
      rodape={
        <span className="text-slate-500 dark:text-slate-400">
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="text-brand-green">
            Criar conta
          </Link>
        </span>
      }
    >
      <form onSubmit={entrar} className="flex flex-col gap-4">
        {contaCriada && (
          <Alerta tipo="sucesso">
            Conta criada! Confirme o e-mail que enviamos e depois entre aqui. ✅
          </Alerta>
        )}
        {senhaAlterada && <Alerta tipo="sucesso">Senha alterada com sucesso. Pode entrar! 🔐</Alerta>}
        {erro && <Alerta tipo="erro">{erro}</Alerta>}

        <CampoTexto
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          autoComplete="email"
          inputMode="email"
          required
          disabled={carregando}
        />

        <CampoTexto
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua senha"
          autoComplete="current-password"
          required
          disabled={carregando}
        />

        <BotaoPrimario type="submit" carregando={carregando} disabled={!email.trim() || !senha}>
          ENTRAR
        </BotaoPrimario>

        <Link
          href="/esqueci-senha"
          className="text-center text-sm font-bold text-slate-400 dark:text-slate-500"
        >
          Esqueci minha senha
        </Link>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
