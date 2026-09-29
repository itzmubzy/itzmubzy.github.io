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
- experience entries
- contact and footer copy

The React components render the config data. Content changes should not require component changes.

## Theme behavior

The theme toggle is in the header. It stores the preference under `km-mubin-theme` in `localStorage` and falls back to the user's system preference on first visit. The small inline script in `index.html` prevents a light/dark flash during initial load.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. In GitHub, open **Settings -> Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`; [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) builds and deploys `dist`.

For a repository URL such as `https://username.github.io/repository-name/`, set the Vite base path in the workflow or build command:

```bash
VITE_BASE_PATH=/repository-name/ npm run build
```

For a custom domain hosted at the root, keep the default `/` base path.

## Attach a custom domain

1. Copy [`public/CNAME.example`](./public/CNAME.example) to `public/CNAME`.
2. Replace `yourdomain.com` with the domain you own.
3. In your domain registrar, point the apex records to GitHub Pages or add the GitHub Pages CNAME record described in GitHub's Pages settings.
4. Add the domain in **Settings -> Pages -> Custom domain**, then wait for HTTPS verification.

`public/CNAME.example` is intentionally not copied as `CNAME` until a real domain is chosen.

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
├── .github/workflows/deploy.yml  # GitHub Pages CI/CD
├── public/CNAME.example          # Custom-domain placeholder
├── src/
│   ├── components/
│   │   ├── ProjectCard.jsx       # Config-driven project card
│   │   ├── SectionHeader.jsx      # Shared section heading
│   │   └── ThemeToggle.jsx        # Persistent theme control
│   ├── App.jsx                    # Page composition and interactions
│   ├── index.css                  # Design tokens, responsive layout, states
│   └── main.jsx                   # React entry point
├── index.html                     # Metadata and theme preloader
├── portfolio.config.json          # Editable content contract
├── tailwind.config.js
├── vite.config.js
├── package.json
├── MEMORY.md                      # Agent handoff source of truth
└── README.md
```

## Accessibility and performance notes

- Skip link, semantic sections, heading hierarchy, visible focus behavior, labelled controls, and reduced-motion support are included.
- The page uses no heavy image assets or runtime animation libraries.
- The layout is mobile-first and collapses navigation, grids, and timelines for small screens.
- External social links use `noopener` behavior through `rel="noreferrer"`.
