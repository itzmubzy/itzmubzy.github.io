import { useEffect, useState } from 'react';
import portfolio from '../portfolio.config.json';
import SectionHeader from './components/SectionHeader.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import ProjectCard from './components/ProjectCard.jsx';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5h5v5M19 5l-8 8" />
      <path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <span className={`menu-icon ${open ? 'menu-icon-open' : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const { site, navigation, about, focusAreas, projects, skills, experience, contact, footer } = portfolio;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('km-mubin-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d0e0c' : '#f5f5f1');
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell min-h-screen">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="KM Mubin home">
            <span className="brand-mark">KM</span>
            <span className="brand-name">{site.shortName}</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>

          <nav id="site-navigation" className={`site-nav ${menuOpen ? 'site-nav-open' : ''}`} aria-label="Primary navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className="hero section-shell">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="status-dot" /> {site.eyebrow}</div>
              <h1>
                {site.shortName}<br />
                <em>{site.role.replace(' Student', '')}</em>
              </h1>
              <p className="hero-tagline">{site.tagline}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">Explore my work <ArrowIcon /></a>
                <a className="text-link" href={`mailto:${site.email}`}>Say hello <ArrowIcon /></a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Profile snapshot">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="visual-cross cross-one" />
              <div className="visual-cross cross-two" />
              <div className="hero-photo">
                <img src="/KM%20MUBIN%20photo.jpeg" alt="KM Mubin smiling outdoors" />
              </div>
              <div className="hero-monogram" aria-hidden="true">KM</div>
              <div className="hero-data-card hero-data-card-top">
                <span className="data-label">Currently</span>
                <strong>{site.availability}</strong>
              </div>
              <div className="hero-data-card hero-data-card-bottom">
                <span className="data-label">Based in</span>
                <strong>{site.location}</strong>
              </div>
              <span className="visual-caption">Data / people / possibility</span>
            </div>
          </div>
          <div className="container hero-bottomline">
            <span>Scroll to explore</span>
            <span className="scroll-line" />
            <span>01 â€” 05</span>
          </div>
        </section>

        <section id="about" className="section-shell section-border">
          <div className="container">
            <SectionHeader label={about.sectionLabel} title={about.title} />
            <div className="about-grid">
              <div className="about-copy">
                {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <aside className="stats-card" aria-label="Portfolio stats">
                <p className="mini-label">At a glance</p>
                <div className="stats-list">
                  {about.stats.map((stat) => (
                    <div className="stat-item" key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="stats-card-note"><span className="status-dot" /> Always learning, always testing</div>
              </aside>
            </div>
          </div>
        </section>

        <section id="focus" className="section-shell section-tint">
          <div className="container">
            <SectionHeader
              label="02 / What I do"
              title="Four ways I like to move a question forward."
              description="The work usually starts with ambiguity. These are the habits I use to turn it into something useful."
            />
            <div className="focus-grid">
              {focusAreas.map((area) => (
                <article className="focus-card" key={area.number}>
                  <div className="focus-card-topline"><span>{area.number}</span><span className="focus-arrow"><ArrowIcon /></span></div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <div className="tag-list">{area.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-shell section-border">
          <div className="container">
            <SectionHeader
              label="03 / Selected work"
              title="Projects with a real question behind them."
              description="A growing body of work across business analytics, public-awareness research, and climate-informed modeling."
            />
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell section-dark">
          <div className="container">
            <SectionHeader
              label="04 / Toolkit"
              title="Enough tools to stay curious."
              description="A practical toolkit for exploring, modeling, visualizing, and communicating data."
            />
            <div className="skills-layout">
              <div className="skills-intro">
                <span className="skills-stamp">KM / DS</span>
                <p>I care less about collecting tools and more about using the right level of complexity for the question at hand.</p>
              </div>
              <div className="skills-grid">
                {skills.map((group) => (
                  <div className="skill-group" key={group.title}>
                    <h3>{group.title}</h3>
                    <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section-shell section-border">
          <div className="container">
            <SectionHeader
              label="05 / Experience"
              title="Learning happens with people, too."
              description="Student communities and volunteer work have taught me how to communicate, take ownership, and make a team more capable."
            />
            <div className="experience-list">
              {experience.map((item, index) => (
                <article className="experience-item" key={`${item.organization}-${item.period}`}>
                  <div className="experience-index">0{index + 1}</div>
                  <div className="experience-period">{item.period}</div>
                  <div className="experience-main">
                    <h3>{item.role}</h3>
                    <p className="experience-org">{item.organization}</p>
                    <p>{item.description}</p>
                  </div>
                  <ArrowIcon />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell contact-section">
          <div className="container contact-grid">
            <SectionHeader label={contact.sectionLabel} title={contact.title} description={contact.description} />
            <div className="contact-card">
              <a className="contact-email" href={`mailto:${site.email}`}>{site.email}<ArrowIcon /></a>
              <div className="contact-meta">
                <a href={`tel:${site.phone.replaceAll(' ', '')}`}>{site.phone}</a>
                <span>{site.location}</span>
              </div>
              <div className="social-list">
                {site.socials.map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
                    <span>{social.label}</span>
                    <span>{social.handle} <ExternalIcon /></span>
                  </a>
                ))}
              </div>
              <p className="contact-closing">{contact.closing}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>{footer.copyright} / {new Date().getFullYear()}</span>
          <span>{footer.note}</span>
          <a href="#top">Back to top <ArrowIcon /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;

