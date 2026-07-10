# Roadmap Grana+

Visão: plataforma completa de educação e prática em investimentos — do iniciante
absoluto ao investidor avançado. A pessoa aprende (trilha gamificada), pratica
(simulação e gestão de carteira) e, quando quiser dar o próximo passo, é
direcionada a assessorias/consultorias parceiras, com disclaimers claros.

**Compliance:** conteúdo estritamente educacional. Nunca recomendação de
investimento (regras CVM). Parcerias exibidas com disclaimer individual.

## Fase 1 — Mecânica de estudo completa (front-end, sem backend)

- [ ] **Domínio para avançar**: só concluir a missão com mínimo de acertos
      (ex: ≥70%); errou demais → refazer. Nada de passar "de qualquer jeito".
- [ ] **Meta diária estilo Duolingo**: usuário escolhe 5/10/15/25 min por dia
      (ou XP equivalente); anel de progresso diário na home; streak passa a
      contar meta batida.
- [ ] **Novos formatos de pergunta**: completar a frase digitando; estudo de
      caso com cenário (texto + pergunta); manter múltipla escolha e V/F.
- [ ] **Prova de nivelamento geral**: teste inicial que posiciona o usuário
      no ponto certo da trilha (desbloqueia seções compatíveis com o nível).

## Fase 2 — Contas e nuvem (Supabase)

- [ ] Login (e-mail/social), histórico e progresso na nuvem, multi-dispositivo.
- [ ] Base para: missão semanal sobre o mercado (conteúdo dinâmico publicado
      pelo admin), ranking/ligas (decidido: só mais pra frente).

## Fase 3 — Prática e ferramentas

- [ ] **Simulador de carteira** (carteira fictícia com preços reais).
- [ ] **Análise de ações** dentro da plataforma (dados de mercado).
- [ ] **Missão semanal**: o que aconteceu no mercado na semana.

## Fase 4 — Integrações e monetização

- [ ] **Conexão com corretoras**: usuário conecta a conta e vê a carteira real
      no app (parcerias com grandes corretoras).
- [ ] **Open Finance**: gestão financeira completa — aprender e praticar no
      mesmo app.
- [ ] **Diretório de assessorias/consultorias** parceiras, com disclaimer por
      parceiro; modelo de indicação.
- [ ] **Monetização**: vidas ilimitadas pagas (freemium) + parcerias.

## Fase 5 — Distribuição

- [ ] Publicar na **App Store** (conta Apple Developer; empacotar via
      Capacitor a partir do PWA atual). Play Store depois.

## Decisões já tomadas

- Público: todos os níveis (trilha progressiva + nivelamento).
- Sem "modo errar de propósito": avanço exige domínio real.
- Ranking: não é prioridade agora.
- Ordem da trilha: Fundamentos → Patrimônio → Psicologia → Renda Fixa →
  Renda Variável → Exterior → Offshore.
- Deploy: GitHub Pages publica apenas da `main` (ambiente github-pages
  rejeita outras branches).
