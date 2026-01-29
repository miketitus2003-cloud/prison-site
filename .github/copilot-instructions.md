# Copilot Instructions for prison-site

## Project Overview
A Next.js portfolio site showcasing prison education and recidivism research with accompanying policy analysis. Single-page design using dark theme, Tailwind CSS, Framer Motion animations, and Lucide icons. All content is defined in a centralized `CONTENT` object in the main component.

## Architecture

### Component Structure
- **Single root component**: `components/PrisonSite.tsx` is the entire UI. It contains:
  - `CONTENT` object: centralized data (research details, policy sections, links, slides metadata)
  - Reusable `Section` wrapper component for consistent styling/spacing
  - `IconBadge` small utility for icon containers
  - `cx` helper for conditional className merging (basic classNameJoin alternative)
  - Navigation/header with responsive mobile menu
  - 5 main sections: home/hero, research, policy, sources, about + footer

- **App structure**: `app/page.tsx` simply imports and renders `PrisonSite` component (marked with `"use client"` for client-side interactivity)

### Data Flow
All content flows from the `CONTENT` constant defined at the top of `PrisonSite.tsx`:
```tsx
const CONTENT = {
  siteTitle, tagline, links,
  research: { title, oneLine, whyItMatters, question, method, results, implications, nextSteps, sources, slides },
  policy: [ { title, icon, oneLine, bullets, bottomLine, linkLabel, href }, ... ]
}
```
- To update site text: modify `CONTENT` directly
- `slides` array expects images in `public/assets/slide_01.png`, etc. (broken images hide gracefully)
- Policy links point to PDFs expected at `public/docs/{deathPenaltyPdf,solitaryPdf}` (optional)

## Styling Conventions

### Tailwind + CSS Approach
- **Tailwind v4 with PostCSS**: utility-first, no component library
- **Color scheme**: dark theme (`bg-neutral-950`, `text-white`, `white/10` opacity modifiers)
- **Spacing**: Tailwind defaults (`p-4`, `mt-6`, `gap-3`)
- **Responsive**: `md:` breakpoint for tablet/desktop (layout shifts from 1-col to multi-col)
- **Global CSS**: `app/globals.css` (minimal; Tailwind v4 handles most)
- **Custom class helper**: Use `cx()` function for conditional Tailwind classes (e.g., `cx("text-white", isDarkMode && "bg-black")`)

### Visual Patterns
- **Cards**: `rounded-3xl bg-white/5 ring-1 ring-white/10 p-6` (standard container)
- **Buttons**: `rounded-2xl` with hover states via `hover:opacity-90` or `hover:bg-white/15`
- **Icons**: always from lucide-react, sized `h-4 w-4`, `h-5 w-5`, etc.
- **Background**: soft blur blobs in fixed overlays (`pointer-events-none`)
- **Section padding**: `scroll-mt-28 py-14 md:py-20` (consistent top offset for navigation)

## Key Workflows

### Development
```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm start            # Run production build locally
npm run lint         # Run ESLint
```

### Adding Content
1. Update `CONTENT` object in `components/PrisonSite.tsx`
2. For research slides: add image file to `public/assets/slide_NN.png` and update `slides` array
3. For policy PDFs: add file to `public/docs/` and reference in `CONTENT.links`

### Styling Changes
- Update Tailwind classes directly in `PrisonSite.tsx` — no separate CSS files
- Theme colors use opacity modifiers: `white/70`, `white/50`, `bg-white/5`
- Use `md:` prefix for responsive tweaks (mobile-first)

## Dependencies & Integrations
- **Next.js 16**: App Router, SSR/SSG, automatic optimization
- **React 19**: Modern hooks, context (not used), conditional rendering
- **Framer Motion**: Only for hero section animations (simple fade+slide on mount)
- **Lucide React**: Icon library (13 icons imported, assigned to policy sections via config)
- **Tailwind CSS v4**: PostCSS integration via `postcss.config.mjs`
- **TypeScript 5**: Strict mode enabled, `@/*` path alias configured

## Project-Specific Patterns

### Conditional Content Rendering
- Policy sections dynamically render with icon based on config (e.g., `Icon={p.icon}`)
- Navigation items built from useMemo array
- Slide images gracefully hide if broken: `onError` handler sets `display: none` on parent

### Type Safety
- Define types inline where used (e.g., `type Slide = { src: string; caption: string }`)
- Use `React.ElementType` for component/icon types
- Cast CONTENT.links lookup with `(CONTENT.links as any)[key]` when accessing dynamic props

### URL & Link Handling
- External links use `target="_blank" rel="noreferrer"`
- Internal anchors use fragment identifiers (e.g., `href="#research"`)
- Mobile menu closes on navigation: `onClick={() => setMenuOpen(false)}`

## Common Tasks

**Add a new policy section**: Add object to `CONTENT.policy` array with `{ title, icon, oneLine, bullets, bottomLine, linkLabel, href }`

**Change theme color**: Modify opacity values (e.g., `bg-white/5` → `bg-white/8`) or swap `neutral-950` base

**Update research findings**: Edit arrays in `CONTENT.research` (whyItMatters, results, implications, etc.)

**Add responsive breakpoint**: Use `md:` prefix on Tailwind classes; project only uses mobile/desktop (no tablet-specific overrides currently)

**Handle missing images/PDFs**: Already built in — broken images hide, missing links show as disabled (`text-white/50 pointer-events-none`)

## Notes for AI Agents
- This is a **portfolio showcase**, not a complex app — all state is local (single `menuOpen` boolean)
- **No API calls or backend** — site is fully static/client-side
- **Content is king** — focus on clarity and accurate data in CONTENT object
- Avoid overcomplicating with state management, routing libraries, or form validation
- Framer Motion is minimal; keep animations simple (enter/fade patterns)
