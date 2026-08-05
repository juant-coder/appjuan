# Deploy — Grana+ (Vercel + Supabase)

Passo a passo na ordem. Leva ~15 min.

---

## 1. Banco de dados (Supabase)

1. Abra o projeto no [supabase.com](https://supabase.com) → **SQL Editor** → **New query**
2. Cole todo o conteúdo de `supabase/schema.sql` e clique em **Run**
3. Confira em **Table Editor** se apareceram: `profiles`, `user_progress`, `analytics_events`

O que o script faz:
- cria as 3 tabelas com **RLS ligado** (cada usuário só enxerga os próprios dados)
- cria o trigger `on_auth_user_created`: todo cadastro novo ganha um `profile` automaticamente, já com o nome preenchido

---

## 2. Autenticação (Supabase)

**Authentication → Providers**
- **Email**: habilitado
- **Confirm email**: sua escolha
  - `ON` → mais seguro; o usuário confirma o e-mail antes de entrar
  - `OFF` → cai direto na trilha após cadastrar (melhor para testar hoje)
- Todos os outros providers: desabilitados

**Authentication → URL Configuration** ⚠️ *sem isso o link de recuperação quebra em produção*

| Campo | Valor |
|---|---|
| Site URL | `https://SEU-APP.vercel.app` |
| Redirect URLs | `https://SEU-APP.vercel.app/**`<br>`http://localhost:3000/**` |

**Authentication → Email Templates → Reset Password**

Troque o link do template para apontar para a rota do app:

```
{{ .SiteURL }}/auth/confirmar?token_hash={{ .TokenHash }}&type=recovery&next=/redefinir-senha
```

E em **Confirm signup**:

```
{{ .SiteURL }}/auth/confirmar?token_hash={{ .TokenHash }}&type=email&next=/
```

---

## 3. Deploy (Vercel)

1. Suba o projeto para o GitHub (o `.gitignore` já protege `.env.local` e `node_modules`)
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório
3. Framework: **Next.js** (detecta sozinho). Não mude build command nem output.
4. Em **Environment Variables**, adicione as duas (Production + Preview + Development):

| Nome | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://zcudqggconuofoorbviw.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` |

5. **Deploy**
6. Com a URL final em mãos, volte no passo 2 e preencha Site URL / Redirect URLs

> `NEXT_PUBLIC_SITE_URL` não é necessária: o app usa `window.location.origin` no cliente e `origin` da request no servidor, então funciona em qualquer domínio (inclusive nos previews da Vercel).

---

## 4. Teste de aceite (5 min, na URL de produção)

- [ ] Abrir `/` deslogado → redireciona para `/login`
- [ ] Criar conta em `/cadastro` → chega no app (ou recebe e-mail, se confirmação ligada)
- [ ] Conferir no Supabase: linha nova em `auth.users` **e** em `profiles`
- [ ] Sair pelo `/perfil` → volta para `/login`
- [ ] `/esqueci-senha` → e-mail chega → link abre `/redefinir-senha` → troca a senha → login com a nova
- [ ] Logado, abrir `/login` na URL → redireciona para `/`
- [ ] Completar uma missão → conferir evento em `analytics_events`

---

## Rotas criadas

| Rota | O que faz |
|---|---|
| `/login` | e-mail + senha; guarda o destino em `?redirect=` |
| `/cadastro` | nome, e-mail, senha (mín. 8) + confirmação |
| `/esqueci-senha` | dispara o e-mail de recuperação |
| `/redefinir-senha` | define a nova senha (exige link válido) |
| `/auth/confirmar` | troca o token do e-mail por sessão |
| `/auth/sair` | logout server-side (POST) |

Proteção fica em `middleware.ts` → `lib/supabase/middleware.ts`: sem sessão em rota privada vai para `/login`; logado não vê login/cadastro.
