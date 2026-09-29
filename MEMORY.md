# Project Memory: KM Mubin Portfolio

Last updated: 2026-09-29

This file is the single source of truth for any agent continuing this project. Read it before changing code.

## Project overview and goals

Build a GitHub-ready personal portfolio for KM Mubin, a Data Science student in Dhaka, Bangladesh. The website is a fast, responsive, single-page experience with anchor navigation, a persistent light/dark theme toggle, editable content, and a frontend structure that can later consume a CMS or API.

The visual direction is inspired by the reference portfolio at `https://portfolio.sakhawatadib.com/`: editorial long-form layout, numbered sections, oversized serif headings, thin divider rules, monochrome surfaces, compact monospace labels, and a bright accent color. This project does not copy the reference site's content or code.

Reference analysis:

- Sticky top navigation with a compact wordmark and section anchors.
- Strong hero with a short positioning statement and clear work/contact actions.
- Long-form sections introduced by numbered labels such as `01 — About`.
- Serif display typography paired with monospace metadata and body copy.
- Thin rules, generous whitespace, restrained surfaces, and a single bright accent.
- Content rhythm moves from identity -> about -> areas of work -> selected work -> toolkit/experience -> contact.
- Contact closes the page with direct email, social links, and a back-to-top action.

## Tech stack and dependencies

- React 18.3.1
- Vite 6.0.5
- Tailwind CSS 3.4.17 for utility processing
- Custom CSS design tokens and responsive layout in `src/index.css`
- `@vitejs/plugin-react`, PostCSS, and Autoprefixer
- GitHub Actions + GitHub Pages for deployment
- No runtime icon or animation library; icons are small inline SVGs.

Install with `npm install`. Run with `npm run dev`; build with `npm run build`; preview with `npm run preview`.

## File and folder structure

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages build/deploy workflow
├── public/CNAME.example          # Placeholder custom-domain file
├── public/KM MUBIN photo.jpeg    # Hero portrait asset
├── src/
│   ├── components/
│   │   ├── ProjectCard.jsx       # Reusable config-driven project card
│   │   ├── SectionHeader.jsx      # Shared numbered section heading
│   │   └── ThemeToggle.jsx        # Theme button and icons
│   ├── App.jsx                    # Page composition, nav state, theme persistence
│   ├── index.css                  # Tokens, layout, component styles, breakpoints
│   └── main.jsx                   # React entry point
├── index.html                     # Metadata and pre-paint theme selection
├── portfolio.config.json          # Editable portfolio content contract
├── package.json                   # Scripts and dependencies
├── postcss.config.js              # Tailwind/PostCSS setup
├── tailwind.config.js             # Tailwind content paths
├── vite.config.js                 # React plugin and configurable base path
├── README.md                      # Setup, editing, deployment, backend notes
└── MEMORY.md                      # This handoff document
```

## Current status

### Done

- Reference site structure and UX patterns analyzed.
- React + Vite + Tailwind project scaffolded.
- Content externalized into `portfolio.config.json`.
- Responsive editorial layout built for hero, about, focus areas, projects, toolkit, experience, contact, and footer.
- Light/dark theme toggle implemented with `localStorage` persistence and system-preference fallback.
- Mobile navigation with keyboard-friendly button states implemented.
- Accessible basics included: skip link, semantic sections, labelled controls, descriptive metadata, focusable links, reduced-motion support.
- GitHub Pages workflow added.
- `public/CNAME.example` added as the safe custom-domain placeholder.
- README added with setup, editing, deploy, domain, and backend-adapter guidance.

### Pending / recommended next

- Run `npm install` and `npm run build` in a network-enabled environment.
- Replace placeholder project case-study states with live repository/demo URLs when available.
- Add a real `public/CNAME` only after choosing the domain.
- If desired, add a downloadable CV link and project thumbnails under `public/`.
- Configure a GitHub remote and push the first commit.
- Consider adding automated accessibility checks (for example, Lighthouse or axe) before launch.

## How to add, edit, or remove content

Edit `portfolio.config.json`; do not hard-code content into the JSX unless it is structural UI text.

### Add or edit a project

Add an object to the `projects` array with:

- `number`: unique display id such as `PJ/04`
- `title`, `category`, `period`, `description`
- `details`: array of short contribution/outcome strings
- `skills`: array of tag labels
- `accent`: `green`, `blue`, or `orange`

Remove the whole object to remove a project card. The `ProjectCard` component will render the updated array automatically.

### Edit other sections

- `site`: identity, role, contact details, location, socials.
- `navigation`: label/href pairs; keep hrefs aligned with section `id` values.
- `about`: section label, paragraphs, and stats.
- `focusAreas`: the four focus cards.
- `skills`: grouped toolkit entries.
- `experience`: timeline rows.
- `contact` and `footer`: closing copy.

## Theme implementation

`index.html` reads `km-mubin-theme` before React paints. `App.jsx` mirrors that value into `document.documentElement.dataset.theme`, updates the `theme-color` meta tag, and persists changes. Theme tokens live at the top of `src/index.css` under `:root` and `:root[data-theme="dark"]`.

## Deploy and attach a custom domain

1. Create a GitHub repository, commit the project, and push the `main` branch.
2. In repository settings, set GitHub Pages source to **GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` runs `npm ci`, builds `dist`, and deploys it.
4. The workflow defaults to `VITE_BASE_PATH=/<repository-name>/` for project sites. For a user site (`username.github.io`) or custom root domain, add a repository Actions variable named `VITE_BASE_PATH` with value `/`.
5. Copy `public/CNAME.example` to `public/CNAME`, replace `yourdomain.com`, commit, and add the same domain in GitHub Pages settings.
6. Configure the registrar's DNS records as shown by GitHub and wait for HTTPS.

Do not commit a fake domain as `public/CNAME`; keep the `.example` placeholder until the real domain is known.

### Visibility rule

For a personal GitHub Free account, GitHub Pages is available from public repositories. Pages from private repositories requires GitHub Pro, Team, or Enterprise. If private-repository Pages is available, keep the repository private but set the Pages site visibility to public so visitors do not need repository access. The recommended free repository name for this account is `itzmubzy.github.io` with public visibility.

## How to switch or add a backend later

The UI currently imports `portfolio.config.json` as a local content contract. Preserve its shape when adding a backend.

1. Add `src/data/portfolioApi.js` with a `getPortfolio()` function that returns the same object shape.
2. Replace the static import in `App.jsx` with async loading, plus loading and error states.
3. Keep section rendering and reusable components unchanged.
4. Add server-side contact handling through a secure endpoint or form provider.
5. Keep secrets out of the client bundle; only public API URLs/config belong in Vite environment variables.

## Conventions

- Use two-space indentation in JavaScript, JSON, CSS, and YAML.
- Use `PascalCase` for React component filenames and component names.
- Use `camelCase` for data keys and functions; use kebab-case for CSS class names.
- Keep content in `portfolio.config.json`; components should render data, not own portfolio facts.
- Use semantic HTML and keep keyboard focus visible.
- Prefer inline SVG for small interface icons so the bundle stays lean.
- Use concise, imperative commit messages with a scope, for example `feat: add project cards` or `docs: update deployment notes`.
- Preserve the editorial visual system: generous spacing, thin rules, serif display type, monospace metadata, and one purposeful accent.

## Changelog

### 2026-09-29 - Project scaffold

- Confirmed React + Vite + Tailwind CSS as the stack.
- Added package metadata, Vite config, Tailwind/PostCSS config, Git ignore rules, and entry HTML.

### 2026-09-29 - Content contract

- Added `portfolio.config.json` with KM Mubin's identity, resume-grounded projects, skills, leadership, contact, and footer content.

### 2026-09-29 - Portfolio UI

- Added the responsive single-page React composition.
- Added reusable section heading, theme toggle, and project card components.
- Added the editorial design system, dark theme tokens, responsive breakpoints, hover/focus states, and reduced-motion support.

### 2026-09-29 - Deployment and handoff docs

- Added GitHub Pages workflow and custom-domain placeholder.
- Added README setup/deployment instructions.
- Added this MEMORY.md handoff source of truth.

### 2026-09-29 - Build verification

- Installed dependencies and generated a successful Vite production build.
- Added a small Tailwind utility usage to keep the build's content scan meaningful.
- Browser preview was attempted, but no browser surface is available in this environment; visual QA remains a recommended local follow-up.

### 2026-09-29 - Hero portrait refinement

- Inspected the existing portrait asset in the workspace and added a public copy for Vite to serve.
- Updated the hero visual to use the portrait with a lightweight editorial frame, orbit lines, and initials badge.

### 2026-09-29 - Pages base-path hardening

- Updated the GitHub Pages workflow to default to a repository subpath.
- Documented the `VITE_BASE_PATH=/` Actions variable for user-site and custom-domain deployments.

### 2026-09-29 - GitHub visibility guidance

- Documented the GitHub Free versus Pro/Team/Enterprise Pages limitation.
- Documented the public-repository recommendation and private-source/public-site option.

### 2026-09-29 - Public repository hygiene

- Excluded the local resume PDF and duplicate root portrait from the Git-tracked deployment payload because the repository is public.
- Kept the intended hero portrait at `public/KM MUBIN photo.jpeg` for the website.
