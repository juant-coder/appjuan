# Grana+

MVP de app gamificado para ensinar investimentos e finanças pessoais, no estilo Duolingo.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Zustand (com persistência em `localStorage`, sem backend)

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Conteúdo

As lições ficam em `/data/unidadeN.json`. A Unidade 1 (Fundamentos) tem 3 lições completas;
as demais unidades têm 1 lição de exemplo cada, prontas para receber mais conteúdo.

## Mecânica

- XP por lição concluída (10 XP por acerto + bônus de 20 XP se não errar nenhuma)
- Streak diário (dias seguidos completando pelo menos uma lição)
- 5 vidas, perde 1 por erro, regenera 1 a cada 4 horas
- Badges por streak, lição perfeita e conclusão de unidades
