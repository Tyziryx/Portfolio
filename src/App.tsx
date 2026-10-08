import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowUpRight, Github, Linkedin, Shield, Server, MonitorDot, Code,
  Mail, BookOpen, X, Menu
} from "lucide-react";
import { translations, Language, Translations } from "./translations";
import "./App.css";
import IsoNet from "./IsoNet";

import geodexImg from "./assets/images/geodex.jpg";
import javaImg from "./assets/images/java-bdd.jpg";
import amsImg from "./assets/images/ams-dashboard.jpg";
import cericarImg from "./assets/images/cericar.jpg";
import mboxImg from "./assets/images/mbox.jpg";

const CV_URL = "/CV%20Alexi%20Miaille2026%20Alternance.pdf";
const MBOX_REPORT_URL = "/Rapport%20FInal%20Miaille%20Alexi.pdf";
const NETWORK_REPORT_URL = "/Rapport%20Reseau%20PME%20DMZ.pdf";
const GITHUB_URL = "/go/github";
const LINKEDIN_URL = "/go/linkedin";
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

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const scrollBehavior = (): ScrollBehavior => (reducedMotion() ? "auto" : "smooth");

// alias anglais vers les clés de réponses communes aux deux langues
const CMD_ALIASES: Record<string, string> = { internship: "stage", apprenticeship: "alternance" };
const ALTERNANCE_START = new Date(2026, 8, 1);

const Terminal = ({ t, lang }: { t: Translations["terminal"]; lang: Language }) => {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [input, setInput] = useState("");
  const [caret, setCaret] = useState(0);
  const [booting, setBooting] = useState(true);
  const historyRef = useRef<string[]>([]);
  const histPos = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // amorçage : whoami tapé caractère par caractère, puis la sortie ligne par ligne
  useEffect(() => {
    const final: TermLine[] = [
      { type: "cmd", text: t.initialCmd },
      { type: "out", text: t.initialOut },
      { type: "hint", text: t.hint }
    ];
    if (reducedMotion()) {
      setLines(final);
      setBooting(false);
      return;
    }
    setBooting(true);
    setLines([{ type: "cmd", text: "" }]);
    const timers: number[] = [];
    let at = 350;
    for (let i = 1; i <= t.initialCmd.length; i++) {
      at += 70;
      timers.push(window.setTimeout(() => setLines([{ type: "cmd", text: t.initialCmd.slice(0, i) }]), at));
    }
    at += 300;
    timers.push(window.setTimeout(() => setLines(final.slice(0, 2)), at));
    at += 350;
    timers.push(window.setTimeout(() => { setLines(final); setBooting(false); }, at));
    return () => timers.forEach(clearTimeout);
  }, [lang, t]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const commands = [...Object.keys(t.responses), ...Object.keys(CMD_ALIASES), "clear", "history", "uptime", "sudo"];

  const updateInput = (v: string) => {
    setInput(v);
    setCaret(v.length);
  };

  const run = useCallback((raw: string) => {
    const typed = raw.trim();
    const lower = typed.toLowerCase();
    if (!typed) return;
    setBooting(false);
    historyRef.current.push(typed);
    histPos.current = -1;
    if (lower === "clear") {
      setLines([]);
      updateInput("");
      return;
    }
    const cmd = CMD_ALIASES[lower] ?? lower;
    const next: TermLine[] = [{ type: "cmd", text: typed }];
    const push = (text: string, type: TermLine["type"] = "out") => text.split("\n").forEach(l => next.push({ type, text: l }));
    const resp = t.responses[cmd];
    if (lower === "sudo" || lower.startsWith("sudo ")) {
      push(t.sudo);
    } else if (cmd === "uptime") {
      push(t.uptime(Math.max(0, Math.floor((Date.now() - ALTERNANCE_START.getTime()) / 86400000))));
    } else if (cmd === "history") {
      const h = historyRef.current.slice(0, -1);
      push(h.length ? h.map((c, i) => `  ${String(i + 1).padStart(3)}  ${c}`).join("\n") : t.historyEmpty);
    } else if (resp) {
      push(resp, cmd === "systemctl status alexi" ? "ok" : "out");
      if (cmd === "projets" || cmd === "projects") {
        document.getElementById("projets")?.scrollIntoView({ behavior: scrollBehavior() });
      }
      if (cmd === "cv") {
        window.open(CV_URL, "_blank", "noopener");
      }
    } else {
      push(t.notFound(typed));
    }
    setLines(prev => [...prev, ...next]);
    updateInput("");
    inputRef.current?.focus();
  }, [t]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const hist = historyRef.current;
    if (e.key === "Enter") {
      run(input);
    } else if (e.key === "ArrowUp" && hist.length) {
      e.preventDefault();
      histPos.current = histPos.current < 0 ? hist.length - 1 : Math.max(0, histPos.current - 1);
      updateInput(hist[histPos.current]);
    } else if (e.key === "ArrowDown" && histPos.current >= 0) {
      e.preventDefault();
      histPos.current += 1;
      if (histPos.current >= hist.length) { histPos.current = -1; updateInput(""); }
      else updateInput(hist[histPos.current]);
    } else if (e.key === "Tab" && input.trim()) {
      const v = input.trim().toLowerCase();
      const matches = commands.filter(c => c.startsWith(v));
      if (matches.length) {
        e.preventDefault();
        if (matches.length === 1) updateInput(matches[0]);
        else setLines(prev => [...prev, { type: "cmd", text: input }, { type: "out", text: matches.join("  ") }]);
      }
    }
  };

  const suggestions = lang === "fr"
    ? ["help", "alternance", "stage", "systemctl status alexi"]
    : ["help", "apprenticeship", "internship", "systemctl status alexi"];

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
            {booting && i === lines.length - 1 && <span className="t-caret t-caret-inline" />}
          </div>
        ))}
        <div className="t-input-line" style={{ visibility: booting ? "hidden" : undefined }}>
          <span className="t-prompt">$</span>
          <span className="t-field">
            <input
              ref={inputRef}
              className="t-input"
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value); setCaret(e.target.selectionStart ?? e.target.value.length); histPos.current = -1; }}
              onSelect={e => setCaret(e.currentTarget.selectionStart ?? input.length)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label={t.inputAria}
            />
            <span className="t-caret" style={{ left: `${caret}ch` }} aria-hidden="true" />
          </span>
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

/* ---------- Mur Grafana : 6 écrans, un par source. CSS/SVG, aucune lib, aucune image ---------- */

// Alertes Atera par créneau : 7 créneaux × 4 jours, niveaux 0..4 (4 = pic, en jaune)
const G_HEAT = [
  0, 1, 1, 2, 1, 0, 0,
  1, 2, 3, 2, 1, 1, 0,
  2, 3, 4, 3, 2, 1, 1,
  0, 1, 2, 2, 1, 1, 0
];

// Parc Atera : segments d'état sur la fenêtre affichée
const G_STATE = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// KPAX : imprimantes hors ligne sur les 7 derniers jours, la dernière barre = valeur affichée
const G_PRINTERS = [1, 2, 1, 2, 2, 4, 3];

// Tickets Atera : 13 points (y du SVG, 0 = haut)
const G_TICKETS = [26, 20, 28, 14, 22, 10, 18, 24, 12, 20, 26, 16, 21];

const toPoints = (ys: number[]) => ys.map((y, i) => `${Math.round(i * 100 / (ys.length - 1))},${y}`).join(" ");

// durée d'un tick du mock et cycle de l'alerte KPAX (en ticks)
const G_TICK_MS = 4000;
const G_ALERT_CYCLE = 8;

const GrafanaWall = ({ size, lang }: { size: "thumb" | "large"; lang: Language }) => {
  const fr = lang === "fr";
  const live = size === "large";
  const [tick, setTick] = useState(0);
  const [tickets, setTickets] = useState(G_TICKETS);
  const [heat, setHeat] = useState(G_HEAT);
  const [clock, setClock] = useState(() => new Date());

  // le mock ne vit qu'en grand (modal) et jamais en reduced-motion
  useEffect(() => {
    if (!live || reducedMotion()) return;
    const id = window.setInterval(() => {
      setTick(n => n + 1);
      setClock(new Date());
      setTickets(prev => [...prev.slice(1), 10 + Math.round(Math.random() * 20)]);
      setHeat(prev => {
        const next = [...prev];
        const i = Math.floor(Math.random() * next.length);
        next[i] = Math.min(3, Math.max(0, next[i] + (Math.random() < 0.5 ? -1 : 1)));
        return next;
      });
    }, G_TICK_MS);
    return () => clearInterval(id);
  }, [live]);

  // une imprimante tombe au tick 2, revient au tick 5 : FIRING puis RESOLVED
  const phase = tick % G_ALERT_CYCLE;
  const firing = live && tick > 0 && phase >= 2 && phase < 5;
  const resolved = live && tick > 0 && phase >= 5 && phase < 7;
  const printers = firing ? 4 : 3;
  const ticketCount = 10 + Math.round((40 - tickets[tickets.length - 1]) / 7.5);
  const pts = toPoints(tickets);
  const hhmmss = clock.toTimeString().slice(0, 8);

  return (
    <div
      className={`g-wall g-wall--${size}`}
      aria-hidden={size === "thumb" ? true : undefined}
      role={size === "large" ? "img" : undefined}
      aria-label={size === "large"
        ? (fr
          ? "Reconstitution du mur de supervision : trois écrans Atera (tickets, alertes, parc), un écran Veeam, un écran KPAX, un écran Bitdefender"
          : "Monitoring wall reconstruction: three Atera screens (tickets, alerts, fleet), one Veeam screen, one KPAX screen, one Bitdefender screen")
        : undefined}
    >
      <div className="g-bar">
        <span className="g-led" />
        <span className="g-bar-t">grafana</span>
        <span className="g-bar-sep">/</span>
        <span className="g-bar-s">parc-sbi</span>
        {firing && <span className="g-alert crit">firing · kpax {fr ? "imprimante hors ligne" : "printer offline"}</span>}
        {resolved && <span className="g-alert ok">resolved · kpax</span>}
        <span className="g-bar-r">
          {live
            ? (fr ? `màj ${hhmmss}` : `updated ${hhmmss}`)
            : (fr ? "6 écrans · auto 30 s" : "6 screens · auto 30 s")}
        </span>
      </div>

      <div className="g-grid">
        {/* écran 1 · Atera : tickets ouverts */}
        <div className="g-p">
          <div className="g-head"><span className="g-src">Atera</span><span className="g-num">{ticketCount}</span></div>
          <div className="g-viz">
            <svg className="g-chart" viewBox="0 0 100 40" preserveAspectRatio="none" focusable="false">
              <g className="g-glines"><path d="M0 10H100M0 20H100M0 30H100" /></g>
              <path className="g-area" d={`M${pts.split(" ").join(" ")} V40 H0 Z`} />
              <polyline className="g-ln" points={pts} />
            </svg>
          </div>
          <div className="g-cap g-lg">{fr ? "tickets ouverts" : "open tickets"}</div>
        </div>

        {/* écran 2 · Atera : alertes */}
        <div className="g-p">
          <div className="g-head"><span className="g-src">Atera</span><span className="g-num warn">4</span></div>
          <div className="g-viz g-heat">
            {heat.map((lvl, i) => <i key={i} className={`g-cell g-l${lvl}`} />)}
          </div>
          <div className="g-cap g-lg">{fr ? "alertes / créneau" : "alerts / slot"}</div>
        </div>

        {/* écran 3 · Atera : parc */}
        <div className="g-p">
          <div className="g-head"><span className="g-src">Atera</span><span className="g-num ok">OK</span></div>
          <div className="g-viz g-state">
            {G_STATE.map((_, i) => <i key={i} />)}
          </div>
          <div className="g-cap g-lg">{fr ? "parc en ligne" : "fleet online"}</div>
        </div>

        {/* écran 4 · Veeam : sauvegardes, 2 échecs donc jaune */}
        <div className="g-p">
          <div className="g-head"><span className="g-src">Veeam</span><span className="g-num warn">96%</span></div>
          <div className="g-viz g-gauge">
            <svg viewBox="0 0 100 54" focusable="false">
              <path className="gg-track" d="M10 48 A40 40 0 0 1 90 48" pathLength={100} />
              <path className="gg-fill" d="M10 48 A40 40 0 0 1 90 48" pathLength={100} strokeDasharray="96 100" />
            </svg>
          </div>
          <div className="g-cap g-lg">{fr ? "47/49 · 2 échecs" : "47/49 · 2 failed"}</div>
        </div>

        {/* écran 5 · KPAX : imprimantes hors ligne, 7 derniers jours */}
        <div className={`g-p${firing ? " g-firing" : ""}`}>
          <div className="g-head"><span className="g-src">KPAX</span><span className={`g-num ${firing ? "crit" : "warn"}`}>{printers}</span></div>
          <div className="g-viz g-bars">
            {G_PRINTERS.map((n, i) => {
              const last = i === G_PRINTERS.length - 1;
              return <i key={i} className={last ? "now" : ""} style={{ height: `${(last ? printers : n) * 22}%` }} />;
            })}
          </div>
          <div className="g-cap g-lg">{fr ? "hors ligne · 7 j" : "offline · 7 d"}</div>
        </div>

        {/* écran 6 · Bitdefender : protection des postes */}
        <div className="g-p">
          <div className="g-head"><span className="g-src">Bitdefender</span></div>
          <div className="g-viz g-shield">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 2 L21 6 V12 L12 22 L3 12 V6 Z" />
              <path d="M8 12 L11 15 L16 9" />
            </svg>
            <span className="g-shield-t">{fr ? "actif" : "active"}</span>
          </div>
          <div className="g-cap g-lg">{fr ? "protection postes" : "endpoints"}</div>
        </div>
      </div>
    </div>
  );
};

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

// libellé mono qui se "décode" à son apparition, puis reste fixe
const DECODE_CHARS = "0123456789ABCDEF/_<>";
const Decode = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    setShown(text);
    const el = ref.current;
    if (!el || reducedMotion() || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / 550);
        const fixed = Math.floor(p * text.length);
        setShown(text.split("").map((c, i) =>
          i < fixed || c === " " ? c : DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)]
        ).join(""));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [text]);

  return <div ref={ref} className={className} aria-label={text}><span aria-hidden="true">{shown}</span></div>;
};

const Portfolio = () => {
  const [lang, setLang] = useState<Language>("fr");
  const [selectedProject, setSelectedProject] = useState<GridProject | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profil");
  const t: Translations = translations[lang];
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

  // parcours : la barre violette suit le défilement, chaque point s'allume quand elle l'atteint
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    const nodes = Array.from(tl.querySelectorAll<HTMLElement>(".tl-item"));
    let h = 0, raf = 0;
    const measure = () => {
      const last = nodes[nodes.length - 1];
      h = last ? last.offsetTop : 0;
      tl.style.setProperty("--tl-h", `${h}px`);
    };
    const update = () => {
      raf = 0;
      const p = reducedMotion()
        ? 1
        : Math.min(1, Math.max(0, (window.innerHeight * 0.55 - tl.getBoundingClientRect().top - 11) / (h || 1)));
      tl.style.setProperty("--p", p.toFixed(4));
      nodes.forEach(n => n.classList.toggle("lit", n.offsetTop <= p * h + 1));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };
    measure(); update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [lang, isNotFound]);

  // modal et menu : Échap ferme, le fond ne défile plus, le focus reste dedans puis revient
  const overlayOpen = !!selectedProject || mobileMenuOpen;
  useEffect(() => {
    if (!overlayOpen) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelectedProject(null); setMobileMenuOpen(false); return; }
      if (e.key !== "Tab") return;
      const root = selectedProject ? modalRef.current : document.querySelector<HTMLElement>(".mobile-menu");
      const items = root?.querySelectorAll<HTMLElement>("a[href], button");
      if (!items || !items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, [overlayOpen, selectedProject]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: scrollBehavior() });
  };

  const gridProjects: GridProject[] = [
    { key: "cericar", ...t.projects.cericar, link: "https://github.com/Tyziryx/CeriCar", image: cericarImg },
    { key: "ams", ...t.projects.ams, link: "https://github.com/Tyziryx/amserveur", image: amsImg },
    { key: "geodex", ...t.projects.geodex, link: "https://github.com/Tyziryx/WebsiteProg", image: geodexImg },
    { key: "java", ...t.projects.java, link: "https://github.com/Tyziryx/Ams-JavaBdd", image: javaImg },
    { key: "grafana", ...t.projects.grafana }
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
            <button className="nav-btn nav-lang" onClick={() => setLang(p => p === "fr" ? "en" : "fr")} aria-label={t.a11y.switchLang}>
              <span className={lang === "fr" ? "on" : ""}>FR</span><span className="sep">/</span><span className={lang === "en" ? "on" : ""}>EN</span>
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
          <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="mobile-menu-head">
              <span>Menu</span>
              <button ref={selectedProject ? undefined : closeRef} className="nav-btn" onClick={() => setMobileMenuOpen(false)} aria-label={t.a11y.closeMenu}>
                <X size={16} />
              </button>
            </div>
            <div className="mobile-menu-links">
              {navLinks.map((l, i) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={e => handleNavClick(e, `#${l.id}`)}
                  className={activeSection === l.id ? "active" : ""}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="mm-idx">{String(i + 1).padStart(2, "0")}</span>{l.label}
                </a>
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
              <span className="ht-line">{t.hero.title1}</span><span className="ht-line accent">{t.hero.title2}</span>
            </h1>
            <p className="hero-desc">
              {t.hero.description}<strong>{t.hero.descriptionHighlight}</strong>{t.hero.descriptionEnd}
            </p>
            <div className="hero-facts bevel">
              {t.hero.facts.map(f => (
                <div key={f.label} className="hf-item">
                  <span className="hf-label">{f.label}</span>
                  <span className="hf-val">{f.value}</span>
                </div>
              ))}
            </div>
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
            <Decode className="eyebrow" text={t.journey.label} />
            <h2 className="sec-title reveal">{t.journey.title1}<br /><span className="dim">{t.journey.title2}</span></h2>
            <div className="timeline" ref={timelineRef}>
              {/* 1 · Alternance COMAITE, en cours */}
              <div className="tl-item current reveal" style={{ "--i": 0 } as React.CSSProperties}>
                <span className="tl-node"></span>
                <div className="tl-date">{t.journey.apprenticeDate}</div>
                <h3>{t.journey.apprenticeTitle}</h3>
                <div className="tl-sub">{t.journey.apprenticeSub}</div>
                <p className="tl-story">
                  {t.journey.apprenticeStory}<strong>{t.journey.apprenticeStoryHighlight}</strong>{t.journey.apprenticeStoryEnd}
                </p>
              </div>
              {/* 2 · Master SYRIUS */}
              <div className="tl-item reveal" style={{ "--i": 1 } as React.CSSProperties}>
                <span className="tl-node"></span>
                <div className="tl-date">{t.journey.masterDate}</div>
                <h3>{t.journey.masterTitle}</h3>
                <div className="tl-sub">{t.journey.masterSub}</div>
              </div>
              {/* 3 · Stage SBI, terminé */}
              <div className="tl-item reveal" style={{ "--i": 2 } as React.CSSProperties}>
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
              {/* 4 · Licence */}
              <div className="tl-item reveal" style={{ "--i": 3 } as React.CSSProperties}>
                <span className="tl-node"></span>
                <div className="tl-date">{t.journey.degreeDate}</div>
                <h3>{t.journey.degreeTitle}</h3>
                <div className="tl-sub">{t.journey.degreeSub}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STACK ===== */}
        <section className="section" id="stack">
          <div className="ghost-num">02</div>
          <div className="section-inner">
            <Decode className="eyebrow" text={t.skills.label} />
            <h2 className="sec-title reveal">{t.skills.title1}<br /><span className="dim">{t.skills.title2}</span></h2>
            <div className="skills-grid">
              {t.skills.categories.map((cat, i) => (
                <div key={i} className="card bevel skill-block reveal" style={{ "--i": i } as React.CSSProperties}>
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
            <Decode className="eyebrow" text={t.projects.label} />
            <h2 className="sec-title reveal">{t.projects.title1}<br /><span className="dim">{t.projects.title2}</span></h2>

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
              <div className="featured-visual featured-visual--iso">
                <IsoNet lang={lang} />
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
                <img src={mboxImg} alt={t.projects.mboxAlt} loading="lazy" />
                <span className="visual-caption">{t.projects.mboxCaption}</span>
              </div>
            </div>

            {/* Grille */}
            <div className="projects-grid">
              {gridProjects.map((p, i) => (
                <div
                  key={p.key}
                  className="card bevel proj-card reveal"
                  style={{ "--i": i } as React.CSSProperties}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(p)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedProject(p); }
                  }}
                >
                  <div className="proj-thumb">
                    {p.key === "grafana"
                      ? <GrafanaWall size="thumb" lang={lang} />
                      : p.image && <img src={p.image} alt={p.title} loading="lazy" />}
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
              <div className="card bevel proj-card proj-next reveal" style={{ "--i": gridProjects.length } as React.CSSProperties}>
                <div className="proj-next-inner">
                  <div className="sym">&gt;<span className="sym-caret">_</span></div>
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
          <div className="modal bevel" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <div className="proj-cat">{selectedProject.category}</div>
                <h3 id="modal-title">{selectedProject.title}</h3>
              </div>
              <button ref={closeRef} className="modal-close" onClick={() => setSelectedProject(null)} aria-label={t.a11y.close}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {selectedProject.image
                ? <img src={selectedProject.image} alt={selectedProject.title} />
                : selectedProject.key === "grafana" && (
                  <>
                    <GrafanaWall size="large" lang={lang} />
                    <span className="visual-caption">{t.projects.wallCaption}</span>
                  </>
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
