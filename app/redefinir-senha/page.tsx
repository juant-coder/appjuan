"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { traduzErroAuth } from "@/lib/auth/errors";
import AuthShell from "@/components/auth/AuthShell";
import CampoTexto from "@/components/auth/CampoTexto";
import BotaoPrimario from "@/components/auth/BotaoPrimario";
import Alerta from "@/components/auth/Alerta";

const MIN_SENHA = 8;

export default function RedefinirSenhaPage() {
  const router = useRouter();

  const [sessaoValida, setSessaoValida] = useState<boolean | null>(null);
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setSessaoValida(Boolean(data.user)));
  }, []);

  const senhasDiferentes = confirmacao.length > 0 && senha !== confirmacao;
  const podeEnviar = senha.length >= MIN_SENHA && senha === confirmacao;

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: senha });

    if (error) {
      setErro(traduzErroAuth(error.message));
      setCarregando(false);
      return;
    }

    await supabase.auth.signOut();
    router.replace("/login?senha=ok");
  }

  if (sessaoValida === null) {
    return <div className="p-8 text-center">Validando seu link...</div>;
  }

  if (!sessaoValida) {
    return (
      <AuthShell
        titulo="Link inválido ou expirado"
        subtitulo="Por segurança, os links de recuperação valem por tempo limitado."
        rodape={
          <Link href="/esqueci-senha" className="text-brand-green">
            Pedir um novo link
          </Link>
        }
      >
        <Alerta tipo="erro">
          Não conseguimos validar este link. Solicite um novo e-mail de recuperação e abra o link
          mais recente.
        </Alerta>
      </AuthShell>
    );
  }

  return (
    <AuthShell titulo="Criar nova senha" subtitulo="Escolha uma senha nova para voltar à sua trilha.">
      <form onSubmit={salvar} className="flex flex-col gap-4">
        {erro && <Alerta tipo="erro">{erro}</Alerta>}

        <CampoTexto
          label="Nova senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder={`Mínimo de ${MIN_SENHA} caracteres`}
          autoComplete="new-password"
          required
          disabled={carregando}
        />

        <div>
          <CampoTexto
            label="Confirmar nova senha"
            type="password"
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
            placeholder="Repita a nova senha"
            autoComplete="new-password"
            required
            disabled={carregando}
          />
          {senhasDiferentes && (
            <p className="mt-1 text-xs font-bold text-brand-red">As senhas não coincidem.</p>
          )}
        </div>

        <BotaoPrimario type="submit" carregando={carregando} disabled={!podeEnviar}>
          SALVAR NOVA SENHA
        </BotaoPrimario>
      </form>
    </AuthShell>
  );
}
