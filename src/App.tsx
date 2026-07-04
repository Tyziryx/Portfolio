import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowUpRight, Github, Linkedin, Shield, Server, MonitorDot, Code,
  Globe, Mail, BookOpen, X, Menu
} from "lucide-react";
import { translations, Language, Translations } from "./translations";
import "./App.css";

import geodexImg from "./assets/images/geodex.jpg";
import javaImg from "./assets/images/java-bdd.jpg";
import amsImg from "./assets/images/ams-dashboard.jpg";
import cericarImg from "./assets/images/cericar.jpg";
import mboxImg from "./assets/images/mbox.jpg";

const CV_URL = "/CV%20Alexi%20Miaille2026%20Alternance.pdf";
const MBOX_REPORT_URL = "/Rapport%20FInal%20Miaille%20Alexi.pdf";
const NETWORK_REPORT_URL = "/Rapport%20Reseau%20PME%20DMZ.pdf";
const GITHUB_URL = "https://github.com/Tyziryx";
const LINKEDIN_URL = "https://www.linkedin.com/in/alexi-miaille-baba88333";
const EMAIL = "alexim13550@gmail.com";

const SECTION_IDS = ["profil", "parcours", "stack", "projets", "contact"];

const skillIcons: Record<string, React.ReactNode> = {
  shield: <Shield size={15} />,
  server: <Server size={15} />,
  monitor: <MonitorDot size={15} />,
  code: <Code size={15} />
};

interface GridProject {
  key: string;
  category: string;
  title: string;
  desc: string;
  tech: string[];
  link?: string;
  image?: string;
}

interface TermLine {
  type: "cmd" | "out" | "ok" | "hint";
  text: string;
}

const Logo = () => (
  <svg viewBox="-20 -20 240 140" aria-label="Alexi Miaille" role="img">
    <defs>
      <linearGradient id="logo-grad" x1="94.89" y1="34.16" x2="137.09" y2="43.88" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#7c3aed" />
        <stop offset=".25" stopColor="#8b5cf6" />
        <stop offset=".54" stopColor="#9333ea" />
        <stop offset=".8" stopColor="#a855f7" />
        <stop offset="1" stopColor="#c084fc" />
      </linearGradient>
    </defs>
    <g>
      <path fill="#a855f7" d="M134.75,34.43c-1.61,5.05-5.46,7.58-11.56,7.58h-28.13l-8.9,24.63h-16.96l8.35-23.63-14.27-.19c-15.91,19.2-31.18,27.99-46.37,27.99-4.42,0-8.15-.82-11.18-2.46-3.82-2.08-5.73-5.15-5.73-9.19,0-3.44,1.42-6.8,4.26-10.09,4.58-5.27,11.51-9.17,20.79-11.7,7.26-1.96,15.34-2.88,24.15-3.46l9.38-.86L87.01,0h22.83l-12.22,34.43h37.13ZM51.91,42.01c-11.84,0-20.15,1.71-24.91,5.12-3.95,2.84-5.92,5.86-5.92,9.05,0,2.72,1.42,4.07,4.26,4.07,3.92,0,8.81-2.21,14.68-6.63,5.15-3.82,9.11-7.69,11.89-11.6ZM90.61,7.86l-19.95,24.8,10.58-.77,9.37-24.04Z" />
      <path fill="#F4F4F5" d="M201.58,91.28c-1.33,5.05-5.72,7.58-13.17,7.58h-17c-5.3,0-7.96-1.53-7.96-4.59,0-1.07.33-2.48.99-4.22l7.86-20.46-23.49,25.77c-2.53,2.81-5.29,4.22-8.29,4.22-.57,0-1.17-.05-1.8-.14-3.6-.41-5.4-2.21-5.4-5.4,0-1.23.28-2.56.85-3.98l11.65-30.08-29.22,35.29c-1.96,2.4-4.83,3.6-8.62,3.6h-9.61l19.13-54.7-23.28.02,4.14-11.96h31.64c4.36,0,6.54,1.59,6.54,4.78,0,1.23-.3,2.72-.9,4.45l-10.18,29.37,20.37-23.07c2.59-2.97,4.58-4.89,5.97-5.78,2.3-1.45,5.29-2.18,8.95-2.18,1.04,0,2.13.36,3.27,1.09,1.74,1.14,2.6,2.83,2.6,5.07,0,1.39-.35,2.95-1.04,4.69l-9.19,23.87,18.23-18.33c2.59-2.59,4.31-4.15,5.16-4.69,1.48-.85,3.62-1.26,6.39-1.23,1.1,0,2.27.41,3.5,1.23,1.89,1.23,2.84,3.03,2.84,5.4,0,1.36-.32,2.86-.95,4.5l-11.32,29.89h21.31Z" />
      <path fill="url(#logo-grad)" d="M134.16,44.12l-40.05.1,4.28-12.06,34.23.45c2.82.8,3.26,1.7,3.08,3.54l-1.53,7.98Z" />
    </g>
  </svg>
);

const Terminal = ({ t, lang }: { t: Translations["terminal"]; lang: Language }) => {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines([
      { type: "cmd", text: t.initialCmd },
      { type: "out", text: t.initialOut },
      { type: "hint", text: t.hint }
    ]);
  }, [lang, t]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const run = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }
    const next: TermLine[] = [{ type: "cmd", text: raw.trim() }];
    const resp = t.responses[cmd];
    if (resp) {
      const type = cmd === "systemctl status alexi" ? "ok" : "out";
      resp.split("\n").forEach(l => next.push({ type, text: l }));
      if (cmd === "projets" || cmd === "projects") {
        document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" });
      }
      if (cmd === "cv") {
        window.open(CV_URL, "_blank", "noopener");
      }
    } else {
      next.push({ type: "out", text: t.notFound(cmd) });
    }
    setLines(prev => [...prev, ...next]);
    setInput("");
    inputRef.current?.focus();
  }, [t]);

  const suggestions = lang === "fr"
    ? ["help", "stage", "projets", "systemctl status alexi"]
    : ["help", "stage", "projects", "systemctl status alexi"];

  return (
    <div className="terminal bevel" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-head">
        <span className="t-dot a"></span><span className="t-dot"></span><span className="t-dot"></span>
        <span className="t-title">{t.title}</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className={`t-line ${l.type === "out" ? "t-out" : l.type === "ok" ? "t-ok" : l.type === "hint" ? "t-hint" : ""}`}>
            {l.type === "cmd" ? (<><span className="t-prompt">$</span> <span className="t-cmd">{l.text}</span></>) : l.text}
          </div>
        ))}
        <div className="t-input-line">
          <span className="t-prompt">$</span>
          <input
            ref={inputRef}
            className="t-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") run(input); }}
            autoComplete="off"
            spellCheck={false}
            aria-label={t.inputAria}
          />
        </div>
      </div>
      <div className="t-suggest">
        <span className="t-suggest-label">{t.tryLabel}</span>
        {suggestions.map(cmd => (
          <button key={cmd} onClick={e => { e.stopPropagation(); run(cmd); }}>{cmd}</button>
        ))}
      </div>
    </div>
  );
};

const NetDiagram = () => (
  <pre className="net-diagram">{`        ┌─────────┐
        │Internet │
        └────┬────┘
             │ WAN :3080
      ┌──────┴──────┐
      │  `}<b>OPNsense</b>{`   │
      │  firewall   │
      └──┬───────┬──┘
    LAN  │       │  DMZ /29
  ┌──────┴───┐ ┌─┴────────┐
  │`}<i>Switch L3</i>{` │ │`}<i>Ubuntu</i>{`    │
  │Cisco+ACL │ │`}<i>nginx :80</i>{` │
  └┬────┬───┬┘ └──────────┘
   │    │   │   `}<em>anti-pivot ✓</em>{`
 `}<b>VL10</b>{` `}<b>VL20</b>{` `}<b>VL30</b>{`
 users admin guest`}</pre>
);

const useReveal = (deps: unknown[]) => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const Portfolio = () => {
  const [lang, setLang] = useState<Language>("fr");
  const [selectedProject, setSelectedProject] = useState<GridProject | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profil");
  const t: Translations = translations[lang];

  const isNotFound = !["/", "/index.html"].includes(window.location.pathname);

  useReveal([lang]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isNotFound]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const gridProjects: GridProject[] = [
    { key: "grafana", ...t.projects.grafana },
    { key: "cericar", ...t.projects.cericar, link: "https://github.com/Tyziryx/CeriCar", image: cericarImg },
    { key: "ams", ...t.projects.ams, link: "https://github.com/Tyziryx/amserveur", image: amsImg },
    { key: "geodex", ...t.projects.geodex, link: "https://github.com/Tyziryx/WebsiteProg", image: geodexImg },
    { key: "java", ...t.projects.java, link: "https://github.com/Tyziryx/Ams-JavaBdd", image: javaImg }
  ];

  const navLinks = [
    { id: "profil", label: t.nav.about },
    { id: "parcours", label: t.nav.journey },
    { id: "stack", label: t.nav.skills },
    { id: "projets", label: t.nav.projects },
    { id: "contact", label: t.nav.contact }
  ];

  if (isNotFound) {
    return (
      <div className="notfound">
        <div className="notfound-box bevel">
          <div className="code">404</div>
          <div className="msg">{t.notFound.msg}</div>
          <div className="sub">{t.notFound.sub}</div>
          <a href="/">{t.notFound.back}</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ===== NAV ===== */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#profil" onClick={e => handleNavClick(e, "#profil")} className="nav-logo" aria-label="Alexi Miaille, accueil">
            <Logo />
          </a>
          <div className="nav-links">
            {navLinks.map(l => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={e => handleNavClick(e, `#${l.id}`)}
                className={activeSection === l.id ? "active" : ""}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button className="nav-btn" onClick={() => setLang(p => p === "fr" ? "en" : "fr")} aria-label={t.a11y.switchLang}>
              <Globe size={16} />
            </button>
            <button className="nav-btn nav-burger" onClick={() => setMobileMenuOpen(true)} aria-label={t.a11y.openMenu}>
              <Menu size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="mobile-menu">
            <div className="mobile-menu-head">
              <span>Menu</span>
              <button className="nav-btn" onClick={() => setMobileMenuOpen(false)} aria-label={t.a11y.closeMenu}>
                <X size={16} />
              </button>
            </div>
            <div className="mobile-menu-links">
              {navLinks.map(l => (
                <a key={l.id} href={`#${l.id}`} onClick={e => handleNavClick(e, `#${l.id}`)}>{l.label}</a>
              ))}
            </div>
            <div className="mobile-menu-foot">
              <span className="pulse-dot"></span>
              <span>Alexi Miaille</span>
            </div>
          </div>
        </>
      )}

      <div className="page">
        {/* ===== HERO ===== */}
        <header className="hero" id="profil">
          <div>
            <div className="status-badge"><span className="pulse-dot"></span> {t.hero.status}</div>
            <h1 className="hero-title">
              {t.hero.title1}<br /><span className="accent">{t.hero.title2}</span>
            </h1>
            <p className="hero-desc">
              {t.hero.description}<strong>{t.hero.descriptionHighlight}</strong>{t.hero.descriptionEnd}
            </p>
            <div className="btn-row">
              <a href="#projets" onClick={e => handleNavClick(e, "#projets")} className="btn-primary bevel">{t.hero.cta}</a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-icon bevel" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn-icon bevel" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <Terminal t={t.terminal} lang={lang} />
        </header>

        {/* ===== PARCOURS ===== */}
        <section className="section" id="parcours">
          <div className="ghost-num">01</div>
          <div className="section-inner">
            <div className="eyebrow">{t.journey.label}</div>
            <h2 className="sec-title reveal">{t.journey.title1}<br /><span className="dim">{t.journey.title2}</span></h2>
            <div className="timeline">
              <div className="tl-item current reveal">
                <span className="tl-node"></span>
                <div className="tl-date">{t.journey.internDate}</div>
                <h3>{t.journey.internTitle}</h3>
                <div className="tl-sub">{t.journey.internSub}</div>
                <p className="tl-story">
                  {t.journey.internStory}<strong>{t.journey.internStoryHighlight}</strong>{t.journey.internStoryEnd}
                </p>
                <div className="tl-phase"><span className="ph">{t.journey.phase1}</span> {t.journey.phase1Label}</div>
                <ul>
                  {t.journey.phase1Items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <div className="tl-phase"><span className="ph">{t.journey.phase2}</span> {t.journey.phase2Label}</div>
                <ul>
                  {t.journey.phase2Items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <div className="chips">
                  {t.journey.internChips.map(c => <span key={c} className="chip hot">{c}</span>)}
                </div>
              </div>
              <div className="tl-item reveal">
                <span className="tl-node"></span>
                <div className="tl-date">{t.journey.degreeDate}</div>
                <h3>{t.journey.degreeTitle}</h3>
                <div className="tl-sub">{t.journey.degreeSub}</div>
              </div>
              <div className="tl-item reveal">
                <span className="tl-node"></span>
                <div className="tl-date">{t.journey.masterDate}</div>
                <h3>{t.journey.masterTitle}</h3>
                <div className="tl-sub">{t.journey.masterSub}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STACK ===== */}
        <section className="section" id="stack">
          <div className="ghost-num">02</div>
          <div className="section-inner">
            <div className="eyebrow">{t.skills.label}</div>
            <h2 className="sec-title reveal">{t.skills.title1}<span className="dim">{t.skills.title2}</span></h2>
            <div className="skills-grid">
              {t.skills.categories.map((cat, i) => (
                <div key={i} className="card bevel skill-block reveal">
                  <h3>{skillIcons[cat.icon]} {cat.name}</h3>
                  <div className="skill-origin mono">{cat.origin}</div>
                  <div className="chips">
                    {cat.items.map(item => (
                      <span key={item.name} className={`chip${item.hot ? " hot" : ""}`}>{item.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="skills-legend">
              <span><span className="swatch hot"></span>{t.skills.legendHot}</span>
              <span><span className="swatch"></span>{t.skills.legendBase}</span>
            </div>
          </div>
        </section>

        {/* ===== PROJETS ===== */}
        <section className="section" id="projets">
          <div className="ghost-num">03</div>
          <div className="section-inner">
            <div className="eyebrow">{t.projects.label}</div>
            <h2 className="sec-title reveal">{t.projects.title1}<span className="dim">{t.projects.title2}</span></h2>

            {/* Featured : Réseau PME GNS3 */}
            <div className="featured bevel reveal" style={{ cursor: "default" }}>
              <div className="featured-info">
                <div className="featured-tag"><span className="star">{t.projects.featuredTag}</span><span>{t.projects.gns3.category}</span></div>
                <h3>{t.projects.gns3.title}</h3>
                <p>{t.projects.gns3.desc}</p>
                <div className="chips" style={{ marginBottom: 22 }}>
                  {t.projects.gns3.tech.map(tech => <span key={tech} className="chip">{tech}</span>)}
                </div>
                <div className="btn-row" style={{ marginTop: "auto" }}>
                  <a href={NETWORK_REPORT_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary bevel">
                    {t.projects.readNetworkReport} <BookOpen size={15} />
                  </a>
                </div>
              </div>
              <div className="featured-visual">
                <NetDiagram />
                <span className="visual-caption">{t.projects.diagramCaption}</span>
              </div>
            </div>

            {/* Featured : Mbox */}
            <div className="featured bevel reveal" style={{ cursor: "default" }}>
              <div className="featured-info">
                <div className="featured-tag"><span className="star">{t.projects.featuredTag}</span><span>{t.projects.mbox.category}</span></div>
                <h3>{t.projects.mbox.title}</h3>
                <p>{t.projects.mbox.desc}</p>
                <div className="chips" style={{ marginBottom: 22 }}>
                  {t.projects.mbox.tech.map(tech => <span key={tech} className="chip">{tech}</span>)}
                </div>
                <div className="btn-row" style={{ marginTop: "auto" }}>
                  <a href="https://github.com/Tyziryx/Mbox" target="_blank" rel="noopener noreferrer" className="btn-primary bevel">
                    {t.projects.viewOnGithub} <Github size={15} />
                  </a>
                  <a href={MBOX_REPORT_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary bevel">
                    {t.projects.readReport} <BookOpen size={15} />
                  </a>
                </div>
              </div>
              <div className="featured-visual">
                <img src={mboxImg} alt="Interface d'administration Mbox" loading="lazy" />
                <span className="visual-caption">{t.projects.mboxCaption}</span>
              </div>
            </div>

            {/* Grille */}
            <div className="projects-grid">
              {gridProjects.map(p => (
                <div
                  key={p.key}
                  className="card bevel proj-card"
                  onClick={() => (p.image || p.link) && setSelectedProject(p)}
                  style={!p.image && !p.link ? { cursor: "default" } : undefined}
                >
                  <div className="proj-thumb">
                    {p.key === "grafana" ? (
                      <div className="g-wall" aria-hidden="true">
                        <div className="g-panel"><div className="g-label">Veeam</div><div className="g-val ok">47 ✓</div></div>
                        <div className="g-panel"><div className="g-label">{lang === "fr" ? "Échecs" : "Failed"}</div><div className="g-val crit">2 ✗</div></div>
                        <div className="g-panel"><div className="g-label">{lang === "fr" ? "Imp. off" : "Prn. off"}</div><div className="g-val warn">3</div></div>
                        <div className="g-panel"><div className="g-label">Tickets</div><div className="g-val">12</div></div>
                        <div className="g-panel"><div className="g-label">{lang === "fr" ? "Alertes" : "Alerts"}</div><div className="g-val warn">4</div></div>
                        <div className="g-panel"><div className="g-label">{lang === "fr" ? "Parc" : "Fleet"}</div><div className="g-val ok">OK</div></div>
                      </div>
                    ) : (
                      p.image && <img src={p.image} alt={p.title} loading="lazy" />
                    )}
                  </div>
                  <div className="proj-body">
                    <div className="proj-cat">{p.category}</div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="proj-tags">
                      {p.tech.map(tech => <span key={tech}>#{tech}</span>)}
                    </div>
                  </div>
                </div>
              ))}
              <div className="card bevel proj-card proj-next">
                <div className="proj-next-inner">
                  <div className="sym">&gt;_</div>
                  <p>{t.projects.nextProject.split("\n").map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== MODAL ===== */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal bevel" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="proj-cat">{selectedProject.category}</div>
                <h3>{selectedProject.title}</h3>
              </div>
              <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label={t.a11y.close}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {selectedProject.image && (
                <img src={selectedProject.image} alt={selectedProject.title} />
              )}
              <p className="modal-desc">{selectedProject.desc}</p>
              <div className="chips">
                {selectedProject.tech.map(tech => <span key={tech} className="chip">{tech}</span>)}
              </div>
              {selectedProject.link && (
                <div className="modal-actions">
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="btn-primary bevel">
                    {t.projects.viewOnGithub} <Github size={15} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== FOOTER / CONTACT ===== */}
      <footer className="footer" id="contact">
        <div className="page">
          <div className="footer-main">
            <div>
              <h2 className="footer-title">{t.contact.title}</h2>
              <p className="footer-sub">{t.contact.subtitle}</p>
            </div>
            <div className="footer-col">
              <div className="btn-row">
                <a href={`mailto:${EMAIL}`} className="btn-primary bevel">
                  {t.contact.cta} <Mail size={15} />
                </a>
                <a href={CV_URL} download className="btn-secondary bevel">
                  {t.contact.downloadCV} <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="footer-socials">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">Github</a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">Linkedin</a>
              </div>
            </div>
          </div>
          <div className="footer-meta">
            <span>{t.footer.copyright}</span>
            <span>{t.footer.uptime}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
