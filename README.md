# Shadow — Portfolio

Modern, high-performance personal developer portfolio built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and [React](https://react.dev) islands, deployed globally on [Cloudflare Workers with Static Assets](https://developers.cloudflare.com/workers/static-assets/).

## 🚀 Tech Stack

- **Framework**: Astro 5 (Zero-JS static output by default)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Shadow Garden CSS variables palette
- **Interactive Islands**: React 19 (`@astrojs/react`) for ambient canvas effects (`Snowfall.tsx` with `client:idle`)
- **Hosting / Edge**: Cloudflare Workers with Static Assets (`wrangler.jsonc`)
- **Icons**: Lucide Icons (`lucide-react`)

## 🛠️ Development & Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Astro dev server at `http://localhost:4321` |
| `npm run build` | Builds static site into `./dist` directory (sub-second build) |
| `npm run preview` | Previews the production build locally |
| `npx wrangler dev` | Simulates local Cloudflare Workers edge environment |
| `npx wrangler deploy` | Deploys static assets directly to Cloudflare global network |

## 📁 Project Structure

```text
├── public/                 # Static assets (favicons, SVGs)
├── src/
│   ├── components/
│   │   ├── sections/       # Zero-JS Astro content sections
│   │   │   ├── UnifiedHero.astro
│   │   │   ├── Chronicle.astro
│   │   │   ├── Operations.astro
│   │   │   ├── Arsenal.astro
│   │   │   ├── ContactShadow.astro
│   │   │   └── Footer.astro
│   │   ├── Navbar.astro    # Navigation with vanilla anti-flash theme toggle
│   │   └── Snowfall.tsx    # Canvas particle physics island (snow & sakura petals)
│   ├── layouts/
│   │   └── Layout.astro    # Base HTML document with theme script & Inter font
│   ├── pages/
│   │   └── index.astro     # Main portfolio page entrypoint
│   └── styles/
│       └── globals.css     # Tailwind v4 theme & CSS reveal keyframe animations
├── astro.config.mjs        # Astro configuration with React & Tailwind plugins
├── wrangler.jsonc          # Cloudflare Workers with Static Assets configuration
└── package.json
```
