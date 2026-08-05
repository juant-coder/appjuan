"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { traduzErroAuth } from "@/lib/auth/errors";
import AuthShell from "@/components/auth/AuthShell";
import CampoTexto from "@/components/auth/CampoTexto";
import BotaoPrimario from "@/components/auth/BotaoPrimario";
import Alerta from "@/components/auth/Alerta";

const MIN_SENHA = 8;

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const senhaCurta = senha.length > 0 && senha.length < MIN_SENHA;
  const senhasDiferentes = confirmacao.length > 0 && senha !== confirmacao;
  const podeEnviar =
    nome.trim().length >= 2 &&
    email.trim().length > 0 &&
    senha.length >= MIN_SENHA &&
    senha === confirmacao;

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setAviso(null);
    setCarregando(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
      options: {
        data: { nome: nome.trim() },
        emailRedirectTo: `${window.location.origin}/auth/confirmar?next=/`,
      },
    });

    if (error) {
      setErro(traduzErroAuth(error.message));
      setCarregando(false);
      return;
    }

    // Sessão imediata (confirmação de e-mail desligada no projeto).
    if (data.session) {
      router.replace("/");
      router.refresh();
      return;
    }

    setAviso(
      "Conta criada! Enviamos um link de confirmação para o seu e-mail. Confirme e volte para entrar.",
    );
    setCarregando(false);
  }

  return (
    <AuthShell
      titulo="Criar sua conta"
      subtitulo="Seu progresso salvo e sincronizado, em qualquer aparelho."
      rodape={
        <span className="text-slate-500 dark:text-slate-400">
          Já tem conta?{" "}
          <Link href="/login" className="text-brand-green">
            Entrar
          </Link>
        </span>
      }
    >
      <form onSubmit={cadastrar} className="flex flex-col gap-4">
        {erro && <Alerta tipo="erro">{erro}</Alerta>}
        {aviso && <Alerta tipo="sucesso">{aviso}</Alerta>}

        <CampoTexto
          label="Como podemos te chamar?"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          autoComplete="name"
          required
          disabled={carregando}
        />

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

        <div>
          <CampoTexto
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder={`Mínimo de ${MIN_SENHA} caracteres`}
            autoComplete="new-password"
            required
            disabled={carregando}
          />
          {senhaCurta && (
            <p className="mt-1 text-xs font-bold text-brand-red">
              Use pelo menos {MIN_SENHA} caracteres.
            </p>
          )}
        </div>

        <div>
          <CampoTexto
            label="Confirmar senha"
            type="password"
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
            placeholder="Repita a senha"
            autoComplete="new-password"
            required
            disabled={carregando}
          />
          {senhasDiferentes && (
            <p className="mt-1 text-xs font-bold text-brand-red">As senhas não coincidem.</p>
          )}
        </div>

        <BotaoPrimario type="submit" carregando={carregando} disabled={!podeEnviar}>
          CRIAR CONTA 🚀
        </BotaoPrimario>
      </form>
    </AuthShell>
  );
}
