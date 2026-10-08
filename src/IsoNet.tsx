import React, { useEffect, useRef } from "react";
import type { Language } from "./translations";

/* ============================================================
   Topologie isométrique de la maquette GNS3, fidèle au schéma
   du rapport (Cloud, Firewall, Switch L3, plaque VLANs, plaque DMZ).
   Trafic continu simulé d'après les règles réelles :
   publication web (DNAT 3080 → 80), sorties Internet (NAT),
   SSH admin, mises à jour du serveur, et refus (ACL Cisco,
   règles OPNsense). SVG + requestAnimationFrame, aucune lib.
   ============================================================ */

type V3 = [number, number, number?];
type NodeId = "cloud" | "fw" | "sw" | "srv" | "users" | "admin" | "guest";

const CW = 30, CH = 17.32, CZ = 34;
const proj = ([x, y, z = 0]: V3): [number, number] => [(x - y) * CW, (x + y) * CH - z * CZ];
const pts = (list: V3[]) => list.map(p => proj(p).map(n => n.toFixed(1)).join(",")).join(" ");

/* ---------- monde ---------- */
const W: Record<NodeId, [number, number]> = {
  cloud: [7, -1.6],
  fw: [7, 3],
  sw: [7, 7.6],
  srv: [11.6, 3],
  users: [11.2, 7.6],
  admin: [11.2, 10.6],
  guest: [11.2, 13.6]
};
const BUS_X = 8.4;

// liens physiques (au sol)
const LINKS: V3[][] = [
  [[...W.cloud], [...W.fw]],
  [[...W.fw], [...W.sw]],
  [[...W.fw], [...W.srv]],
  [[...W.sw], [...W.users]],
  [[...W.sw], [BUS_X, W.sw[1]], [BUS_X, W.admin[1]], [...W.admin]],
  [[BUS_X, W.admin[1]], [BUS_X, W.guest[1]], [...W.guest]]
];

// chemins utilisés par le trafic (sens aller)
const PATH: Record<string, V3[]> = {
  cloud_fw: [[...W.cloud], [...W.fw]],
  fw_srv: [[...W.fw], [...W.srv]],
  fw_sw: [[...W.fw], [...W.sw]],
  sw_users: [[...W.sw], [...W.users]],
  sw_admin: [[...W.sw], [BUS_X, W.sw[1]], [BUS_X, W.admin[1]], [...W.admin]],
  sw_guest: [[...W.sw], [BUS_X, W.sw[1]], [BUS_X, W.guest[1]], [...W.guest]]
};
const back = (p: V3[]) => [...p].reverse();

/* ---------- formes ---------- */
// boîte isométrique : faces visibles dessus, +x (droite), +y (gauche)
const box = (cx: number, cy: number, w: number, d: number, h: number, z0 = 0) => {
  const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - d / 2, y1 = cy + d / 2, z1 = z0 + h;
  return {
    top: pts([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]),
    right: pts([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]]),
    left: pts([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]])
  };
};
// plaque de zone avec épaisseur
const plate = (x0: number, y0: number, x1: number, y1: number, t = 0.22) => ({
  top: pts([[x0, y0, 0], [x1, y0, 0], [x1, y1, 0], [x0, y1, 0]]),
  right: pts([[x1, y0, 0], [x1, y1, 0], [x1, y1, -t], [x1, y0, -t]]),
  left: pts([[x0, y1, 0], [x1, y1, 0], [x1, y1, -t], [x0, y1, -t]])
});
const Box = ({ b, cls }: { b: ReturnType<typeof box>; cls?: string }) => (
  <g className={cls}>
    <polygon className="f-l" points={b.left} />
    <polygon className="f-r" points={b.right} />
    <polygon className="f-t" points={b.top} />
  </g>
);
// lignes sur une face +x (x constant) ou +y (y constant), hauteurs données
const faceLinesX = (x: number, y0: number, y1: number, zs: number[]) => zs.map(z => pts([[x, y0, z], [x, y1, z]]));
const faceLinesY = (y: number, x0: number, x1: number, zs: number[]) => zs.map(z => pts([[x0, y, z], [x1, y, z]]));

// texte posé au sol, le long de +x (dir "x") ou de -y (dir "y")
const floorText = (p: V3, dir: "x" | "y") => {
  const [X, Y] = proj(p);
  return dir === "x" ? `matrix(0.866 0.5 -0.866 0.5 ${X.toFixed(1)} ${Y.toFixed(1)})` : `matrix(0.866 -0.5 0.866 0.5 ${X.toFixed(1)} ${Y.toFixed(1)})`;
};

/* ---------- textes ---------- */
const TXT = {
  fr: {
    aria: "Schéma isométrique animé de la maquette réseau : le trafic web entre par le cloud, passe le pare-feu OPNsense et atteint le serveur en DMZ ; les VLANs USERS, ADMIN et GUEST sortent par le switch L3 ; les tentatives interdites sont bloquées par les ACL du switch ou par le pare-feu.",
    titles: {
      cloud: "Cloud GNS3 en NAT : Internet réel pour la maquette",
      fw: "OPNsense : pare-feu stateful, NAT outbound et port forward 3080 → 80",
      sw: "Switch L3 Cisco IOSvL2 : routage inter-VLAN, DHCP, ACL",
      srv: "Ubuntu + nginx en DMZ : sert ce portfolio",
      users: "VLAN 10 USERS · 192.168.10.0/26",
      admin: "VLAN 20 ADMIN · 192.168.20.0/28 · accès total",
      guest: "VLAN 30 GUEST · 192.168.30.0/26 · Internet seulement"
    },
    legend: ["requête", "réponse", "refusé"],
    tags: { dnat: "DNAT :3080 → :80", acl: "✗ ACL_GUEST_IN", pivot: "✗ DMZ → LAN", ssh: "✗ USERS → :22", nat: "NAT → 172.30.1.61" }
  },
  en: {
    aria: "Animated isometric diagram of the network lab: web traffic comes in from the cloud, crosses the OPNsense firewall and reaches the DMZ server; the USERS, ADMIN and GUEST VLANs go out through the L3 switch; forbidden attempts are blocked by the switch ACLs or by the firewall.",
    titles: {
      cloud: "GNS3 NAT cloud: real Internet access for the lab",
      fw: "OPNsense: stateful firewall, outbound NAT and port forward 3080 → 80",
      sw: "Cisco IOSvL2 L3 switch: inter-VLAN routing, DHCP, ACLs",
      srv: "Ubuntu + nginx in the DMZ: serves this portfolio",
      users: "VLAN 10 USERS · 192.168.10.0/26",
      admin: "VLAN 20 ADMIN · 192.168.20.0/28 · full access",
      guest: "VLAN 30 GUEST · 192.168.30.0/26 · Internet only"
    },
    legend: ["request", "response", "denied"],
    tags: { dnat: "DNAT :3080 → :80", acl: "✗ ACL_GUEST_IN", pivot: "✗ DMZ → LAN", ssh: "✗ USERS → :22", nat: "NAT → 172.30.1.61" }
  }
};

/* ---------- flux ---------- */
type Tone = "req" | "ok" | "bad";
interface Hop { path: V3[]; tone: Tone; at?: NodeId; block?: boolean; tag?: keyof typeof TXT.fr.tags }
const FLOWS: { w: number; hops: Hop[] }[] = [
  // visiteur → portfolio (test 32)
  { w: 4, hops: [
    { path: PATH.cloud_fw, tone: "req", at: "fw", tag: "dnat" },
    { path: PATH.fw_srv, tone: "req", at: "srv" },
    { path: back(PATH.fw_srv), tone: "ok", at: "fw" },
    { path: back(PATH.cloud_fw), tone: "ok", at: "cloud" }
  ] },
  // poste USERS → Internet (test 29)
  { w: 3, hops: [
    { path: PATH.sw_users.slice().reverse(), tone: "req", at: "sw" },
    { path: back(PATH.fw_sw), tone: "req", at: "fw", tag: "nat" },
    { path: back(PATH.cloud_fw), tone: "req", at: "cloud" },
    { path: PATH.cloud_fw, tone: "ok", at: "fw" },
    { path: PATH.fw_sw, tone: "ok", at: "sw" },
    { path: PATH.sw_users, tone: "ok", at: "users" }
  ] },
  // GUEST → Internet (test 31)
  { w: 1, hops: [
    { path: back(PATH.sw_guest), tone: "req", at: "sw" },
    { path: back(PATH.fw_sw), tone: "req", at: "fw" },
    { path: back(PATH.cloud_fw), tone: "req", at: "cloud" },
    { path: PATH.cloud_fw, tone: "ok", at: "fw" },
    { path: PATH.fw_sw, tone: "ok", at: "sw" },
    { path: PATH.sw_guest, tone: "ok", at: "guest" }
  ] },
  // ADMIN → SSH serveur (test 22)
  { w: 2, hops: [
    { path: back(PATH.sw_admin), tone: "req", at: "sw" },
    { path: back(PATH.fw_sw), tone: "req", at: "fw" },
    { path: PATH.fw_srv, tone: "req", at: "srv" },
    { path: back(PATH.fw_srv), tone: "ok", at: "fw" },
    { path: PATH.fw_sw, tone: "ok", at: "sw" },
    { path: PATH.sw_admin, tone: "ok", at: "admin" }
  ] },
  // USERS → site en DMZ, port 80 autorisé (test 17)
  { w: 1, hops: [
    { path: back(PATH.sw_users), tone: "req", at: "sw" },
    { path: back(PATH.fw_sw), tone: "req", at: "fw" },
    { path: PATH.fw_srv, tone: "req", at: "srv" },
    { path: back(PATH.fw_srv), tone: "ok", at: "fw" },
    { path: PATH.fw_sw, tone: "ok", at: "sw" },
    { path: PATH.sw_users, tone: "ok", at: "users" }
  ] },
  // serveur → mises à jour apt / GitHub (test 28)
  { w: 1, hops: [
    { path: back(PATH.fw_srv), tone: "req", at: "fw" },
    { path: back(PATH.cloud_fw), tone: "req", at: "cloud" },
    { path: PATH.cloud_fw, tone: "ok", at: "fw" },
    { path: PATH.fw_srv, tone: "ok", at: "srv" }
  ] }
];
// refus, joués à tour de rôle pour rester visibles
const DENIED: Hop[][] = [
  // GUEST → USERS : ACL du switch (tests 12-15)
  [{ path: back(PATH.sw_guest), tone: "req", at: "sw", block: true, tag: "acl" }],
  // pivot DMZ → LAN : règle 1 de l'interface DMZ (tests 24-27)
  [{ path: back(PATH.fw_srv), tone: "req", at: "fw", block: true, tag: "pivot" }],
  // USERS → SSH DMZ : règle LAN 3 d'OPNsense (test 19)
  [{ path: back(PATH.sw_users), tone: "req", at: "sw" }, { path: back(PATH.fw_sw), tone: "req", at: "fw", block: true, tag: "ssh" }]
];

const SPEED = 3.4;        // unités monde par seconde
const DWELL = 220;        // traitement dans un équipement (ms)
const MAX_LIVE = 7;

const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

interface Live {
  hops: Hop[]; hop: number; t: number; wait: number; dying: number;
  el: SVGGElement; screen: [number, number][]; seg: number[]; len: number;
}
const prep = (path: V3[]) => {
  const screen = path.map(p => proj(p));
  const seg = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1]));
  return { screen, seg, len: seg.reduce((a, b) => a + b, 0) };
};
const at = (screen: [number, number][], seg: number[], d: number): [number, number] => {
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const k = seg[i] ? Math.min(1, d / seg[i]) : 1;
      return [screen[i][0] + (screen[i + 1][0] - screen[i][0]) * k, screen[i][1] + (screen[i + 1][1] - screen[i][1]) * k];
    }
    d -= seg[i];
  }
  return screen[screen.length - 1];
};

const NS = "http://www.w3.org/2000/svg";

/* ---------- composant ---------- */
const IsoNet = ({ lang }: { lang: Language }) => {
  const tx = TXT[lang];
  const rootRef = useRef<SVGSVGElement>(null);
  const pkLayer = useRef<SVGGElement>(null);
  const tagLayer = useRef<SVGGElement>(null);
  const nodes = useRef<Partial<Record<NodeId, SVGGElement | null>>>({});
  const tagsRef = useRef(tx.tags);
  tagsRef.current = tx.tags;

  useEffect(() => {
    if (reduced()) return;
    const layer = pkLayer.current, tags = tagLayer.current, root = rootRef.current;
    if (!layer || !tags || !root) return;

    const live: Live[] = [];
    let visible = false, raf = 0, last = 0, nextSpawn = 400, nextDeny = 2600, denyIdx = 0;

    const flash = (id: NodeId | undefined, cls: "hit" | "deny") => {
      const g = id && nodes.current[id];
      if (!g) return;
      g.classList.remove("hit", "deny");
      void g.getBoundingClientRect();
      g.classList.add(cls);
      window.setTimeout(() => g.classList.remove(cls), cls === "deny" ? 900 : 420);
    };
    // une seule étiquette à la fois par équipement ; un refus remplace l'étiquette en cours
    const shown: Partial<Record<NodeId, SVGTextElement>> = {};
    const floatTag = (id: NodeId, key: keyof typeof TXT.fr.tags, bad: boolean) => {
      const cur = shown[id];
      if (cur?.isConnected) {
        if (!bad) return;
        cur.remove();
      }
      const [x, y] = W[id];
      const [X, Y] = proj([x, y, id === "fw" ? 1.6 : 1.0]);
      const t = document.createElementNS(NS, "text");
      t.setAttribute("x", (id === "fw" ? X - 48 : X).toFixed(1));
      t.setAttribute("y", (Y - 34).toFixed(1));
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("class", `iso-float${bad ? " bad" : ""}`);
      t.textContent = tagsRef.current[key];
      tags.appendChild(t);
      shown[id] = t;
      window.setTimeout(() => t.remove(), 1700);
    };
    const startHop = (p: Live) => {
      const h = p.hops[p.hop];
      const { screen, seg, len } = prep(h.path);
      p.screen = screen; p.seg = seg; p.len = len; p.t = 0;
      p.el.setAttribute("class", `iso-pk ${h.tone}`);
    };
    const spawn = (hops: Hop[]) => {
      const el = document.createElementNS(NS, "g") as SVGGElement;
      el.innerHTML = '<circle class="halo" r="9"/><circle class="core" r="4"/>';
      layer.appendChild(el);
      const p: Live = { hops, hop: 0, t: 0, wait: 0, dying: 0, el, screen: [], seg: [], len: 0 };
      startHop(p);
      live.push(p);
    };
    const pick = () => {
      const total = FLOWS.reduce((a, f) => a + f.w, 0);
      let r = Math.random() * total;
      for (const f of FLOWS) { r -= f.w; if (r <= 0) return f.hops; }
      return FLOWS[0].hops;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      if (!visible || document.hidden) return;

      nextSpawn -= dt; nextDeny -= dt;
      if (nextSpawn <= 0) {
        if (live.length < MAX_LIVE) spawn(pick());
        nextSpawn = 650 + Math.random() * 900;
      }
      if (nextDeny <= 0) {
        spawn(DENIED[denyIdx % DENIED.length]);
        denyIdx++;
        nextDeny = 4200 + Math.random() * 1200;
      }

      for (let i = live.length - 1; i >= 0; i--) {
        const p = live[i];
        if (p.dying) {
          p.dying -= dt;
          if (p.dying <= 0) { p.el.remove(); live.splice(i, 1); }
          continue;
        }
        if (p.wait > 0) {
          p.wait -= dt;
          if (p.wait <= 0) { startHop(p); p.el.style.visibility = "visible"; }
          continue;
        }
        p.t += (dt / 1000) * SPEED;
        const d = Math.min(p.t, p.len);
        const [X, Y] = at(p.screen, p.seg, d);
        p.el.setAttribute("transform", `translate(${X.toFixed(1)} ${Y.toFixed(1)})`);
        if (p.t >= p.len) {
          const h = p.hops[p.hop];
          if (h.block) {
            p.el.setAttribute("class", "iso-pk bad dead");
            flash(h.at, "deny");
            if (h.tag && h.at) floatTag(h.at, h.tag, true);
            p.dying = 650;
            continue;
          }
          flash(h.at, "hit");
          if (h.tag && h.at) floatTag(h.at, h.tag, false);
          p.hop += 1;
          if (p.hop >= p.hops.length) { p.el.remove(); live.splice(i, 1); continue; }
          p.wait = DWELL;
          p.el.style.visibility = "hidden";
        }
      }
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; last = 0; }, { threshold: 0.15 });
    io.observe(root);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      live.forEach(p => p.el.remove());
      tags.replaceChildren();
    };
  }, []);

  // fonds d'étiquettes ajustés au texte réel (la police grossit sur mobile)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fit = () => root.querySelectorAll<SVGGElement>(".iso-chip, .iso-ip").forEach(g => {
      const t = g.querySelector("text"), r = g.querySelector("rect");
      if (!t || !r) return;
      const w = t.getComputedTextLength() + 12;
      const h = parseFloat(getComputedStyle(t).fontSize) + 6;
      r.setAttribute("width", w.toFixed(1)); r.setAttribute("x", (-w / 2).toFixed(1));
      r.setAttribute("height", h.toFixed(1)); r.setAttribute("y", (-h / 2 - 1).toFixed(1));
      t.setAttribute("y", (h / 2 - 4.5).toFixed(1));
    });
    fit();
    const mq = window.matchMedia("(max-width: 700px)");
    mq.addEventListener("change", fit);
    document.fonts?.ready.then(fit);
    return () => mq.removeEventListener("change", fit);
  }, [lang]);

  /* ---------- dessin statique ---------- */
  const setNode = (id: NodeId) => (el: SVGGElement | null) => { nodes.current[id] = el; };
  const vlan = plate(7.9, 6.3, 12.6, 14.7);
  const dmz = plate(9.9, 1.3, 13.3, 4.7);
  const [cx, cy] = proj([...W.cloud, 0.25]);

  const fw = box(W.fw[0], W.fw[1], 1.3, 1.0, 1.05);
  const sw = box(W.sw[0], W.sw[1], 1.7, 1.0, 0.34);
  const srv = box(W.srv[0], W.srv[1], 0.95, 0.95, 1.6);
  const pc = (id: "users" | "admin" | "guest") => {
    const [x, y] = W[id];
    return {
      base: box(x, y, 0.5, 0.6, 0.06),
      stand: box(x, y, 0.08, 0.1, 0.32, 0.06),
      screen: box(x, y, 0.1, 1.0, 0.68, 0.36),
      glass: pts([[x + 0.05, y - 0.42, 0.44], [x + 0.05, y + 0.42, 0.44], [x + 0.05, y + 0.42, 0.98], [x + 0.05, y - 0.42, 0.98]])
    };
  };
  const label = (id: NodeId, text: string, z: number) => {
    const [X, Y] = proj([...W[id], z]);
    const w = text.length * 6.1 + 12;
    return (
      <g className="iso-chip" transform={`translate(${X.toFixed(1)} ${(Y - 14).toFixed(1)})`}>
        <rect x={-w / 2} y={-9} width={w} height={16} />
        <text y={3} textAnchor="middle">{text}</text>
      </g>
    );
  };
  const ipTag = (p: V3, text: string) => {
    const [X, Y] = proj(p);
    const w = text.length * 5.6 + 10;
    return (
      <g className="iso-ip" transform={`translate(${X.toFixed(1)} ${Y.toFixed(1)})`}>
        <rect x={-w / 2} y={-8} width={w} height={14} />
        <text y={2.5} textAnchor="middle">{text}</text>
      </g>
    );
  };

  return (
    <figure className="isonet">
      <svg ref={rootRef} className="iso-svg" viewBox="-215 18 605 492" role="img" aria-label={tx.aria}>
        {/* zones */}
        <g className="iso-plate vlan">
          <polygon className="p-l" points={vlan.left} /><polygon className="p-r" points={vlan.right} /><polygon className="p-t" points={vlan.top} />
        </g>
        <g className="iso-plate dmz">
          <polygon className="p-l" points={dmz.left} /><polygon className="p-r" points={dmz.right} /><polygon className="p-t" points={dmz.top} />
        </g>

        {/* libellés au sol, comme sur le schéma du rapport */}
        <text className="iso-floor" transform={floorText([7.75, 1.9], "y")}>WAN</text>
        <text className="iso-floor" transform={floorText([7.75, 6.5], "y")}>LAN</text>
        <text className="iso-floor" transform={floorText([10.3, 4.5], "x")}>DMZ</text>
        <text className="iso-floor" transform={floorText([12.5, 12.9], "y")}>VLANs</text>

        {/* câbles */}
        <g className="iso-links">
          {LINKS.map((l, i) => <polyline key={i} points={pts(l)} />)}
        </g>

        <g ref={pkLayer} className="iso-pks" />

        {/* équipements, du fond vers l'avant */}
        <g ref={setNode("cloud")} className="iso-node cloud">
          <title>{tx.titles.cloud}</title>
          <path transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)})`}
            d="M-30 10 Q-34 -4 -20 -6 Q-18 -20 -2 -18 Q8 -28 20 -16 Q34 -16 32 -2 Q40 4 32 10 Z" />
        </g>

        <g ref={setNode("fw")} className="iso-node fw">
          <title>{tx.titles.fw}</title>
          <Box b={fw} />
          {faceLinesX(W.fw[0] + 0.65, W.fw[1] - 0.5, W.fw[1] + 0.5, [0.35, 0.7]).map((d, i) => <polyline key={`a${i}`} className="brick" points={d} />)}
          {faceLinesY(W.fw[1] + 0.5, W.fw[0] - 0.65, W.fw[0] + 0.65, [0.35, 0.7]).map((d, i) => <polyline key={`b${i}`} className="brick" points={d} />)}
          <polyline className="brick" points={pts([[W.fw[0] + 0.65, W.fw[1], 0], [W.fw[0] + 0.65, W.fw[1], 0.35]])} />
          <polyline className="brick" points={pts([[W.fw[0] + 0.65, W.fw[1] - 0.25, 0.35], [W.fw[0] + 0.65, W.fw[1] - 0.25, 0.7]])} />
          <polyline className="brick" points={pts([[W.fw[0] + 0.65, W.fw[1] + 0.25, 0.35], [W.fw[0] + 0.65, W.fw[1] + 0.25, 0.7]])} />
          <polyline className="brick" points={pts([[W.fw[0] + 0.65, W.fw[1], 0.7], [W.fw[0] + 0.65, W.fw[1], 1.05]])} />
          <polyline className="brick" points={pts([[W.fw[0], W.fw[1] + 0.5, 0], [W.fw[0], W.fw[1] + 0.5, 0.35]])} />
          <polyline className="brick" points={pts([[W.fw[0] - 0.33, W.fw[1] + 0.5, 0.35], [W.fw[0] - 0.33, W.fw[1] + 0.5, 0.7]])} />
          <polyline className="brick" points={pts([[W.fw[0] + 0.33, W.fw[1] + 0.5, 0.35], [W.fw[0] + 0.33, W.fw[1] + 0.5, 0.7]])} />
          <polyline className="brick" points={pts([[W.fw[0], W.fw[1] + 0.5, 0.7], [W.fw[0], W.fw[1] + 0.5, 1.05]])} />
        </g>

        <g ref={setNode("srv")} className="iso-node srv">
          <title>{tx.titles.srv}</title>
          <Box b={srv} />
          {faceLinesY(W.srv[1] + 0.475, W.srv[0] - 0.4, W.srv[0] + 0.4, [0.4, 0.8, 1.2]).map((d, i) => <polyline key={i} className="slot" points={d} />)}
          {[0.2, 0.6, 1.0, 1.4].map((z, i) => {
            const [X, Y] = proj([W.srv[0] + 0.3, W.srv[1] + 0.475, z]);
            return <rect key={i} className={`led l${i}`} x={X - 1.5} y={Y - 1.5} width={3} height={3} />;
          })}
        </g>

        <g ref={setNode("sw")} className="iso-node sw">
          <title>{tx.titles.sw}</title>
          <Box b={sw} />
          {Array.from({ length: 8 }, (_, i) => {
            const [X, Y] = proj([W.sw[0] - 0.7 + i * 0.2, W.sw[1] + 0.5, 0.17]);
            return <rect key={i} className="port" x={X - 2} y={Y - 2} width={4} height={3.5} />;
          })}
        </g>

        {(["users", "admin", "guest"] as const).map(id => {
          const m = pc(id);
          return (
            <g key={id} ref={setNode(id)} className="iso-node pc">
              <title>{tx.titles[id]}</title>
              <Box b={m.base} />
              <Box b={m.stand} />
              <Box b={m.screen} />
              <polygon className="glass" points={m.glass} />
            </g>
          );
        })}

        {/* étiquettes, reprises du schéma */}
        {ipTag([6.0, -0.7], "WAN 172.30.1.61")}
        {ipTag([6.1, 5.3], "10.10.10.0/30")}
        {ipTag([9.0, 3.95], "192.168.40.0/29")}
        {ipTag([9.3, 7.6], "192.168.10.0/26")}
        {ipTag([9.3, 10.6], "192.168.20.0/28")}
        {ipTag([9.3, 13.6], "192.168.30.0/26")}
        {label("cloud", "Cloud", 0.95)}
        {label("fw", "OPNsense", 1.25)}
        {label("sw", "Switch L3", 0.55)}
        {label("srv", "SRV Web", 1.8)}
        {label("users", "Users", 1.15)}
        {label("admin", "Admin", 1.15)}
        {label("guest", "Guest", 1.15)}

        <g ref={tagLayer} className="iso-tags" />
      </svg>
      <figcaption className="iso-legend">
        <span><i className="req" />{tx.legend[0]}</span>
        <span><i className="ok" />{tx.legend[1]}</span>
        <span><i className="bad" />{tx.legend[2]}</span>
      </figcaption>
    </figure>
  );
};

export default IsoNet;
