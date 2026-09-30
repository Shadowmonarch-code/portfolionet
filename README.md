# Toufik Mahata — Bong Coder Portfolio

A comic-book-styled, scroll-driven personal portfolio for **Toufik Mahata (Bong Coder)**, a B.Tech Biotechnology & Bioinformatics student at RPCAU, Pusa, Bihar. It covers full-stack web, cybersecurity and computational biology aimed at agriculture and the environment.

> *"With great code comes great impact."*

---

## Features

- **Preloader** with a spider "THWIP!" counter
- **Animated hero** on a canvas layer, with an accessible screen-reader text fallback
- **Origin story:** a pinned, four-page comic scroll (campus, code, DNA, portrait)
- **Manifesto:** a character-by-character scrubbed text reveal
- **"My Powers":** a horizontal-scroll skills track with tilt cards
- **Scrapbook:** a parallax photo collage
- **The Missions:** a grid of project cards (see below)
- **Contact section** with a magnetic call-to-action button and social links
- **Iron Man mode:** a second theme (red, gold and gunmetal with arc-reactor blue). Toggle it with the footer reactor button, or press `/` or `i`. The choice is saved in `localStorage`.
- **Live Pinterest wall** in the scrapbook, synced with the Pinterest account @Toufikmahata20 (refreshes every 2 minutes)
- **BongBot:** a guide chatbot that answers questions about Toufik and scrolls the visitor to the relevant section
- **Custom cursor** with contextual labels, plus smooth scrolling
- **Respects `prefers-reduced-motion`** and adapts to touch and narrow screens

## Missions (projects)

| # | Project | Description | Stack / Tags |
|---|---------|-------------|--------------|
| M-01 | [Bio-Align](https://bio-align.vercel.app) | Life-sciences platform: plant breeding stats and bioinformatics tools, cross-checked with SciPy | Next.js, TypeScript, ANOVA, PCA |
| M-02 | AgriPrep | Exam prep for ICAR AIEEA, CSIR NET, GATE and DBT-BET aspirants | Next.js 14, MongoDB, JWT |
| M-03 | Campus Cart | RPCAU campus e-commerce with hostel-specific delivery and campus coins | E-commerce |
| M-04 | FluxER | Wireless security auditing script | Bash, Termux |
| M-05 | Soil Microbiome AI | Case file coming soon | AI, Agriculture |
| M-06 | AI Crop Monitoring | Case file coming soon | AI, Agriculture |
| M-07 | WasteZero | Case file coming soon | Environment |
| M-08 | CEREBROX | Case file coming soon | — |

## Tech Stack

- **Markup / styling / logic:** plain HTML, CSS and vanilla JavaScript in a single self-contained file (images are embedded as base64 data URIs)
- **Animation:** [GSAP 3.12.5](https://gsap.com/) + ScrollTrigger
- **Smooth scroll:** [Lenis 1.1.18](https://github.com/darkroomengineering/lenis)
- **Fonts (Google Fonts):** Anton, Bangers, Permanent Marker, Space Grotesk
- **SEO:** meta tags, canonical URL, Open Graph and Twitter cards, and JSON-LD structured data (`Person`, `WebSite`, `CreativeWork`)

GSAP, ScrollTrigger and Lenis load from the jsDelivr CDN, so an internet connection is needed for the animations.

## Running Locally

The site is one HTML file with no build step.

```bash
# Option 1: just open it
open Toufik_Mahata___Bong_Coder_Portfolio.html

# Option 2: serve it locally
python3 -m http.server 8000
# then visit http://localhost:8000
```

Consider renaming the file to `index.html` for hosting.

## Deployment

The site is deployed on **Vercel**. To deploy your own copy:

1. Rename the file to `index.html`.
2. Push the project to GitHub and import it in Vercel, or run `vercel` from the project folder with the [Vercel CLI](https://vercel.com/docs/cli).
3. *(Optional)* Add the BongBot serverless function at `api/assistant.js` (see below) and set its API key as a Vercel environment variable.
4. Update the canonical, Open Graph and JSON-LD URLs to your own domain.

The Open Graph image is referenced at `/assets/og-image.jpg` (1200×630), so add that file alongside `index.html`.

## BongBot Setup

BongBot's front end calls a same-origin endpoint, **`/api/assistant`**. That endpoint is expected to be a serverless function holding the model API key on the server side, so no key is exposed in the page.

- **With the endpoint:** replies come from the model, and may end with `[GO:section]` or `[IRON]` tags. The page strips these tags from the visible text and uses them to scroll to a section or switch theme.
- **Without the endpoint** (for example, plain static hosting with no `api/` folder): BongBot falls back to built-in offline answers covering missions, skills, hiring and "who is Toufik".

The serverless function itself is not included in this file.

## Pinterest Scrapbook Wall

The scrapbook ends with a wall of pins pulled live from Pinterest.

- `api/pinterest.js` is a Vercel serverless function. It reads the account's public RSS feed on the server (browsers can't, because of CORS) and returns JSON.
- The page calls `/api/pinterest` on load, every 2 minutes, and when the tab regains focus. Responses are cached at Vercel's edge for 2 minutes.
- To pull a single board, use `/api/pinterest?board=board-name`, or change `USER` at the top of the function to switch accounts.
- Pins and boards must be **public**. The feed returns only the most recent pins, and it only works when deployed on Vercel (or via `vercel dev`), not when opening the HTML file directly.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` or `i` | Toggle Iron Man mode (ignored while typing in an input) |
| `Esc` | Close the BongBot panel |

## Customizing

- **Content:** edit the section markup (`#origin`, `#skills`, `#scrapbook`, `#missions`, `#contact`).
- **Colors:** change the CSS variables in `:root` (`--red`, `--ink`, `--paper`, `--blue`, `--gold`). Iron Man mode overrides them under `body.iron`.
- **Projects:** duplicate a `.mission` block in `#missions` and update the number, image, text and tags.
- **Images:** replace the embedded base64 data URIs. Note that these make the file large (about 7 MB), so consider moving images to an `assets/` folder for faster loads.

## Links

- GitHub: [BONGCODER7](https://github.com/BONGCODER7) · [Shadowmonarch-code](https://github.com/Shadowmonarch-code)
- LinkedIn: [toufik-mahata](https://www.linkedin.com/in/toufik-mahata-549376214)
- ResearchGate: [Toufik-Mahata](https://www.researchgate.net/profile/Toufik-Mahata)

© 2026 Toufik Mahata
