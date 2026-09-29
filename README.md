# KM Mubin Portfolio

A responsive, single-page portfolio for KM Mubin, a Data Science student interested in exploratory data analysis, statistical reasoning, and practical machine learning.

The site is inspired by the editorial structure of [Adib Sakhawat's portfolio](https://portfolio.sakhawatadib.com/): compact anchor navigation, numbered sections, large serif headlines, thin rules, restrained color, and a clear contact close. The content and visual system are original to this project.

## Stack

- React 18
- Vite 6
- Tailwind CSS 3 (utility layer plus custom CSS design system)
- GitHub Actions + GitHub Pages deployment

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

## Edit the content

All portfolio content lives in [`portfolio.config.json`](./portfolio.config.json). You can add, remove, or edit:

- site identity, contact details, social links, and navigation
- about copy and stats
- focus areas
- projects and their tags/details
- skills groups
- experience entries, work modes, and responsibility bullets
- contact and footer copy

The React components render the config data. Content changes should not require component changes.

## Automatic GitHub projects

The Projects section also syncs public repositories from [`github.com/itzmubzy`](https://github.com/itzmubzy) in the browser through GitHub's public API. New public repositories will appear automatically after the site is redeployed or refreshed.

The sync settings live in `portfolio.config.json`:

```json
"github": {
  "username": "itzmubzy",
  "enabled": true,
  "includeForks": false,
  "includeArchived": false,
  "exclude": []
}
```

Add repository names to `exclude` when a public repository should not appear. The three curated projects in the `projects` array remain visible even if GitHub is unavailable, so the page has a reliable fallback. No GitHub token is stored in the frontend.

## Theme behavior

The theme toggle is in the header. It stores the preference under `km-mubin-theme` in `localStorage` and falls back to the user's system preference on first visit. The small inline script in `index.html` prevents a light/dark flash during initial load.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. In GitHub, open **Settings -> Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`; [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) builds and deploys `dist`.

### Repository visibility choice

If your personal account is on GitHub Free, use a **public repository** for GitHub Pages. GitHub Pages from private repositories requires GitHub Pro, Team, or Enterprise. When your plan allows Pages from a private repository, the source code can stay private while the deployed Pages site remains visible to everyone on the internet.

Recommended free setup: create a public repository named `itzmubzy.github.io` for the portfolio. Recommended paid/private setup: create a private repository named `itzmubzy.github.io`, then publish its Pages site publicly from the Pages settings.

The workflow automatically uses `/` for a user-site repository such as `username.github.io`, and a repository subpath such as `/repository-name/` for ordinary project sites. For the configured custom domain `kmmubin.me`, keep the repository Actions variable `VITE_BASE_PATH` set to `/`.

You can also set the base path locally for a repository URL such as `https://username.github.io/repository-name/`:

```bash
VITE_BASE_PATH=/repository-name/ npm run build
```

For a custom domain hosted at the root, set the repository variable to `/` before deploying.

## Attach the custom domain

The repository is prepared for `kmmubin.me` through [`public/CNAME`](./public/CNAME).

1. In GitHub, open **Settings -> Pages**, set **Source** to **GitHub Actions**, and enter `kmmubin.me` under **Custom domain**.
2. In Namecheap DNS, set these apex `A` records:
   - `@` -> `185.199.108.153`
   - `@` -> `185.199.109.153`
   - `@` -> `185.199.110.153`
   - `@` -> `185.199.111.153`
3. Optional: add a `CNAME` record for host `www` pointing to `itzmubzy.github.io`.
4. After DNS and GitHub verification complete, enable **Enforce HTTPS** in the same Pages screen.

The apex DNS records are already resolving to GitHub Pages. The `www` record is optional and still needs to be added if that hostname should work.

[`public/CNAME.example`](./public/CNAME.example) remains as a reusable placeholder for future domains.

## Add a backend later

Keep the current JSON file as the local content contract. When a CMS or API is ready:

1. Create a data adapter such as `src/data/portfolioApi.js` that returns the same shape as `portfolio.config.json`.
2. Replace the static import in `src/App.jsx` with a loading/error state and an async data fetch.
3. Keep presentational components (`SectionHeader`, `ProjectCard`, and the section markup) unchanged.
4. Move contact form handling to a server endpoint or form provider; never put private API keys in this Vite client.

This keeps the rendering layer independent from the eventual source of truth.

## Project structure

```text
.
â”œâ”€â”€ .github/workflows/deploy.yml  # GitHub Pages CI/CD
â”œâ”€â”€ public/CNAME                   # Active custom domain: kmmubin.me
â”œâ”€â”€ public/CNAME.example           # Reusable custom-domain placeholder
â”œâ”€â”€ public/KM MUBIN photo.jpeg    # Hero portrait asset
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ data/
â”‚   â”‚   â””â”€â”€ githubRepos.js         # Public GitHub repository adapter
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ ProjectCard.jsx       # Config-driven project card
â”‚   â”‚   â”œâ”€â”€ SectionHeader.jsx      # Shared section heading
â”‚   â”‚   â””â”€â”€ ThemeToggle.jsx        # Persistent theme control
â”‚   â”œâ”€â”€ App.jsx                    # Page composition and interactions
â”‚   â”œâ”€â”€ index.css                  # Design tokens, responsive layout, states
â”‚   â””â”€â”€ main.jsx                   # React entry point
â”œâ”€â”€ index.html                     # Metadata and theme preloader
â”œâ”€â”€ portfolio.config.json          # Editable content contract
â”œâ”€â”€ tailwind.config.js
â”œâ”€â”€ vite.config.js
â”œâ”€â”€ package.json
â”œâ”€â”€ MEMORY.md                      # Agent handoff source of truth
â””â”€â”€ README.md
```

## Accessibility and performance notes

- Skip link, semantic sections, heading hierarchy, visible focus behavior, labelled controls, and reduced-motion support are included.
- The page uses no heavy image assets or runtime animation libraries.
- The layout is mobile-first and collapses navigation, grids, and timelines for small screens.
- External social links use `noopener` behavior through `rel="noreferrer"`.

