# Shastra AI v2 — Liquid Dark Matter

A complete redesign. New design language: editorial serif typography, molten gold palette, crosshair cursor, liquid gold particle animation.

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- Framer Motion (animations)
- Tailwind CSS (utility styling)
- Nodemailer (real email delivery)
- react-dropzone (file upload)
- Canvas API (custom 3D particle animation)

## Design System
- **Primary font**: Cormorant Garamond (display, editorial serif)
- **Body font**: Figtree (clean, modern)
- **Mono font**: Martian Mono (terminal, labels)
- **Primary color**: Molten gold (#d4920a / #f0b429)
- **Background**: Deep void (#06050f)
- **Cursor**: Precision crosshair with lagging ring

## Quick Start

```bash
# 1. Install
cd shastra-v2
npm install

# 2. Configure email
cp .env.local.example .env.local
# Edit .env.local with your Gmail + App Password

# 3. Run
npm run dev
```

Open http://localhost:3000

## Gmail Setup (for contact form)
1. Go to your Google Account → Security → 2-Step Verification (enable it)
2. Go to https://myaccount.google.com/apppasswords
3. Generate an App Password for "Mail"
4. Use that 16-char password as SMTP_PASS in .env.local

## Pages
| Route | Description |
|-------|-------------|
| `/` | Home — giant editorial hero, stats, services film strip, work grid, CTA |
| `/services` | 9 service cards with hover-expand details + connect link |
| `/about` | Founder story, timeline, values |
| `/work` | 6 case studies (expandable) + 6 testimonials |
| `/contact` | Form with file upload, email + WhatsApp delivery |

## Cursor
Precision crosshair (full-screen H + V lines) that:
- Snaps to mouse instantly
- Changes to gold on hover
- Ring lags behind with spring physics
- Expands on cards, collapses on links

## Hero Animation
Gold particle network that:
- Morphs between 4 shapes as you scroll: sphere → figure-8 → lattice → spiral
- Responds to mouse movement with subtle attraction
- Spring physics so nodes float naturally to target positions
- Parallax on scroll

## Deploy to Vercel
```bash
npx vercel
```
Add env variables in Vercel dashboard.

## Update Contact Details
Search `918285862455` → replace with your WhatsApp number
Search `ask.shastraai@gmail.com` → replace with your email
