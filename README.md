# Karthikeyan Murugavel — Portfolio (v2)

Dark, glowing, motion-led portfolio. Next.js 15 (App Router), TypeScript, GSAP + ScrollTrigger,
Lenis smooth scroll, and one hand-written WebGL shader for the light ribbon. No Tailwind, no three.js.

The previous versions (Vite site, `next/`, `system/`, `video/`, design directions) are kept
untouched in `_archive/`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
npm run typecheck
```

Deploy on Vercel: import the repo, framework "Next.js", no settings needed.

## Where things live

| Path | What |
|---|---|
| `lib/content.ts` | **Every word on the site.** Edit copy, links and numbers here only. |
| `components/Ribbon.tsx` | The fixed WebGL background: hero light ribbon, aurora, wave field. |
| `components/Motion.tsx` | All animation: intro, scroll reveals, counters, lime statement. |
| `app/globals.css` | Design tokens at the top, then one block per section. |
| `components/*.tsx` | One file per section, markup only. |

Animated elements only carry `data-*` attributes; `Motion.tsx` drives them. With JavaScript off
or `prefers-reduced-motion`, everything renders in its final state.

## Before you publish

- **Résumé**: put the PDF at `public/karthikeyan-murugavel-resume.pdf`, then set
  `resumeReady: true` in `lib/content.ts` if you want a résumé button.
- **FITA credential**: earlier versions disagree on "Master's Program" vs "Advanced Program".
  The site says "data science & ai, fita academy" until you confirm (see `VERIFY` in content.ts).
- **Illustrative UI**: the job-pipeline approval card (role: ML Engineer, board: Greenhouse)
  is a representative example, not a logged run. The hero card no longer carries invented
  sample questions — it shows JARVIS 2.0's signal path, and the three rows beneath it are
  stated facts with their denominators.
- The two RAG metrics still missing denominators (100% refusals, 100% hit@4) are deliberately
  left off the site.
