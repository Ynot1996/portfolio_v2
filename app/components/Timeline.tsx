"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type AnimationPlaybackControls,
} from "framer-motion";
import { FiBriefcase, FiBookOpen, FiCpu, FiAward, FiZap, FiArrowUpRight } from "react-icons/fi";
import type { IconType } from "react-icons";
import { timeline, type Milestone, type MilestoneKind, type Phase } from "../data";
import Footer from "./Footer";
import { SideF1, TopF1 } from "./journey/cars";
import { LANDMARKS, PHASE_STYLE, PhaseIcon, SceneryDefs } from "./journey/scenery";

const kindIcon: Record<MilestoneKind, IconType> = {
  work: FiBriefcase,
  education: FiBookOpen,
  project: FiCpu,
  award: FiAward,
  milestone: FiZap,
};

const phaseOrder: Phase[] = ["Finance & economics", "Foundation", "Birmingham", "London"];
const phaseMeta: Record<Phase, { label: string; text: string; varName: string }> = {
  "Finance & economics": { label: "Finance & economics", text: "text-muted", varName: "--muted" },
  Foundation: { label: "Foundation & prep", text: "text-accent", varName: "--accent" },
  Birmingham: { label: "University of Birmingham · MSc CS (Distinction)", text: "text-accent2", varName: "--accent-2" },
  London: { label: "London · new chapter", text: "text-up", varName: "--up" },
};

const groups = phaseOrder.map((ph) => ({
  phase: ph,
  items: timeline.filter((m) => m.phase === ph),
}));
const flat = groups.flatMap((g) => g.items);

/* ------------------------------ Node card -------------------------------- */
const LIT_SHADOW =
  "0 0 0 2px rgb(var(--accent) / 0.7), 0 18px 48px -10px rgb(var(--accent) / 0.6)";

function Card({ m, lit = false, onDrive }: { m: Milestone; lit?: boolean; onDrive?: () => void }) {
  const Icon = kindIcon[m.kind];
  const meta = phaseMeta[m.phase];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      onClick={onDrive}
      style={{ boxShadow: lit ? LIT_SHADOW : undefined }}
      className={[
        "rounded-2xl border bg-panel p-4 shadow-soft transition-[border-color,box-shadow] duration-300",
        onDrive ? "cursor-pointer" : "",
        lit ? "border-accent" : "border-line hover:border-accent/40",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted">{m.period}</span>
        <Icon className={`h-4 w-4 ${lit ? "text-accent" : meta.text}`} aria-hidden />
      </div>
      <h3 className="mt-2 font-display text-sm font-semibold leading-snug tracking-tight text-ink">
        {m.title}
      </h3>
      <p className="mt-0.5 text-xs text-muted">{m.org}</p>
      {m.slug && (
        <Link
          href={`/projects/${m.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-2 inline-flex items-center gap-1 rounded text-xs font-medium text-accent outline-none hover:underline focus-visible:ring-2 focus-visible:ring-accent"
        >
          Case study <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      )}
    </motion.div>
  );
}

/* ---------------------- wide screens: side-on S-track --------------------- */
// The road snakes down the page as before, but each row is seen from the side:
// a raised track with landmarks standing on the verge behind it and the
// milestone cards hanging below. Bends at the row ends carry the car down.
const PER_ROW = 4;
const START = 178; // x of the first column: leaves room for the bends
const COLGAP = 235;
const CARD_W = 220;
const HEAD = 160; // free space above each row's road, for the landmarks
const ROWGAP = 340;
const Y0 = 12;
const BEND = 150; // how far a bend swings out beyond the row's end stop
const SCENE = 0.34; // landmarks are drawn at about a third of their size
const VERGE_Y = 11; // landmarks stand on the verge this far above the road's centre
const CAR = 0.3; // side-view car scale

type Pt = { x: number; y: number };
type Piece = { phase: Phase; pts: Pt[] }; // 2 points = line, 4 = cubic
type Sample = { l: number; x: number; y: number };

const mid = (a: Pt, b: Pt): Pt => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
function splitCubic([p0, p1, p2, p3]: Pt[]) {
  const a = mid(p0, p1), b = mid(p1, p2), c = mid(p2, p3);
  const ab = mid(a, b), bc = mid(b, c), m = mid(ab, bc);
  return [[p0, a, ab, m], [m, bc, c, p3]];
}
const seg = (p: Piece) =>
  p.pts.length === 2
    ? `L ${p.pts[1].x} ${p.pts[1].y}`
    : `C ${p.pts[1].x} ${p.pts[1].y}, ${p.pts[2].x} ${p.pts[2].y}, ${p.pts[3].x} ${p.pts[3].y}`;
const pieceD = (p: Piece) => `M ${p.pts[0].x} ${p.pts[0].y} ${seg(p)}`;

// layout: boustrophedon rows of PER_ROW stops
const rowCount = Math.ceil(flat.length / PER_ROW);
const rows: { y: number; ltr: boolean; idx: number[] }[] = [];
const pos: Pt[] = [];
{
  let col = 0;
  for (let r = 0; r < rowCount; r++) {
    const ltr = r % 2 === 0;
    const idx: number[] = [];
    const y = Y0 + HEAD + r * ROWGAP;
    flat.slice(r * PER_ROW, (r + 1) * PER_ROW).forEach((_, k) => {
      if (k > 0) col += ltr ? 1 : -1;
      idx.push(r * PER_ROW + k);
      pos.push({ x: START + col * COLGAP, y });
    });
    rows.push({ y, ltr, idx });
  }
}
const W = START * 2 + Math.max(...pos.map((p) => p.x - START)) ;
const H = Y0 + HEAD + (rowCount - 1) * ROWGAP + 220;

// road pieces, each owned by one phase (split halfway between stops)
const pieces: Piece[] = [];
{
  const lead = 46;
  const first = pos[0];
  pieces.push({ phase: flat[0].phase, pts: [{ x: first.x - lead, y: first.y }, first] });
  for (let i = 0; i < flat.length - 1; i++) {
    const a = pos[i], b = pos[i + 1];
    if (a.y === b.y) {
      const m = mid(a, b);
      pieces.push({ phase: flat[i].phase, pts: [a, m] });
      pieces.push({ phase: flat[i + 1].phase, pts: [m, b] });
    } else {
      const out = rows.find((r) => r.y === a.y)!.ltr ? 1 : -1;
      const k = BEND * (4 / 3) * out;
      const [h1, h2] = splitCubic([a, { x: a.x + k, y: a.y }, { x: a.x + k, y: b.y }, b]);
      pieces.push({ phase: flat[i].phase, pts: h1 });
      pieces.push({ phase: flat[i + 1].phase, pts: h2 });
    }
  }
  const last = pos[pos.length - 1];
  const lastLtr = rows[rows.length - 1].ltr;
  pieces.push({ phase: flat[flat.length - 1].phase, pts: [last, { x: last.x + (lastLtr ? lead : -lead), y: last.y }] });
}
const ROUTE = `M ${pieces[0].pts[0].x} ${pieces[0].pts[0].y} ${pieces.map(seg).join(" ")}`;

// roadside landmarks: a small scene in the gap between each pair of
// neighbouring stops on a row; each phase uses its scenes in order
const sights: { phase: Phase; x: number; y: number; k: number }[] = [];
{
  const used: Partial<Record<Phase, number>> = {};
  rows.forEach((row) => {
    row.idx.slice(1).forEach((i) => {
      const phase = flat[i].phase;
      const k = used[phase] ?? 0;
      if (k >= LANDMARKS[phase].length) return;
      used[phase] = k + 1;
      sights.push({ phase, x: (pos[i - 1].x + pos[i].x) / 2, y: row.y, k });
    });
  });
}

function Kerb({ d, phase }: { d: string; phase: Phase }) {
  const k = PHASE_STYLE[phase].kerb;
  return (
    <g fill="none">
      <path d={d} stroke={k[0]} strokeWidth={18} />
      {k.length === 2 ? (
        <path d={d} stroke={k[1]} strokeWidth={18} strokeDasharray="6 6" />
      ) : (
        <>
          <path d={d} stroke={k[1]} strokeWidth={18} strokeDasharray="4 8" />
          <path d={d} stroke={k[2]} strokeWidth={18} strokeDasharray="4 8" strokeDashoffset={-4} />
        </>
      )}
    </g>
  );
}

function SideSnake() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const rearRef = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);
  const speedRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const geo = useRef<{ total: number; samples: Sample[]; stops: number[] } | null>(null);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const targetIdx = useRef(0);
  const reverse = useRef(false);
  const dragging = useRef(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const s = useMotionValue(0);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const inView = useInView(wrapRef, { amount: 0.2 });

  // place the car on the road; it leans through bends and turns round on the
  // leftward rows (mirrored, so it stays upright)
  const place = useCallback(
    (l: number) => {
      const path = pathRef.current;
      const g = geo.current;
      if (!path || !g || !carRef.current) return;
      const p = path.getPointAtLength(l);
      const a = path.getPointAtLength(Math.max(0, l - 1.5));
      const b = path.getPointAtLength(Math.min(g.total, l + 1.5));
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      if (reverse.current) {
        dx = -dx;
        dy = -dy;
      }
      const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
      const left = dx < 0;
      const rot = left ? deg - 180 : deg;
      carRef.current.setAttribute(
        "transform",
        `translate(${p.x} ${p.y}) rotate(${rot}) scale(${left ? -1 : 1} 1) translate(0 1) scale(${CAR})`
      );
      const spin = `rotate(${(l / (16 * CAR)) * (180 / Math.PI)})`;
      rearRef.current?.setAttribute("transform", spin);
      frontRef.current?.setAttribute("transform", spin);
      speedRef.current?.setAttribute("opacity", String(Math.min(1, Math.abs(s.getVelocity()) / 700)));
      trailRef.current?.setAttribute("stroke-dasharray", `${l} ${g.total + 10}`);
    },
    [s]
  );

  useMotionValueEvent(s, "change", place);

  // measure the route: sample it, and find each stop's distance along it
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const samples: Sample[] = [];
    for (let l = 0; l <= total; l += 2) {
      const p = path.getPointAtLength(l);
      samples.push({ l, x: p.x, y: p.y });
    }
    const stops = pos.map(({ x, y }) => {
      let best = samples[0];
      for (const q of samples) {
        if ((q.x - x) ** 2 + (q.y - y) ** 2 < (best.x - x) ** 2 + (best.y - y) ** 2) best = q;
      }
      return best.l;
    });
    geo.current = { total, samples, stops };
    s.set(stops[0]);
    place(stops[0]);
    setActive(0);
    setReady(true);
  }, [s, place]);

  const driveTo = useCallback(
    (idx: number) => {
      const g = geo.current;
      if (!g) return;
      const i = Math.max(0, Math.min(g.stops.length - 1, idx));
      targetIdx.current = i;
      // keep the destination (its stretch of road and its card) on screen
      const card = cardRefs.current[i];
      if (card) {
        const r = card.getBoundingClientRect();
        if (r.top - 120 < 80 || r.bottom > window.innerHeight) {
          window.scrollBy({ top: r.top - 120 - window.innerHeight * 0.3, behavior: reduced ? "auto" : "smooth" });
        }
      }
      const from = s.get();
      const to = g.stops[i];
      controls.current?.stop();
      if (to !== from) reverse.current = to < from;
      if (reduced || to === from) {
        s.set(to);
        place(to);
        setActive(i);
        return;
      }
      setActive(null);
      controls.current = animate(s, to, {
        duration: Math.min(2.8, Math.max(0.5, Math.abs(to - from) / 520)),
        ease: "easeInOut",
        onComplete: () => setActive(i),
      });
    },
    [s, place, reduced]
  );

  // ← / → (or A / D) drive between stops while the road is on screen
  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const k = e.key.toLowerCase();
      if (k === "arrowright" || k === "d") {
        e.preventDefault();
        driveTo(targetIdx.current + 1);
      } else if (k === "arrowleft" || k === "a") {
        e.preventDefault();
        driveTo(targetIdx.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, driveTo]);

  // drag the car along the road; it drives to the nearest stop on release
  const svgRef = useRef<SVGSVGElement>(null);
  const onPointerDown = (e: React.PointerEvent<SVGGElement>) => {
    if (!geo.current) return;
    controls.current?.stop();
    dragging.current = true;
    setActive(null);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<SVGGElement>) => {
    const g = geo.current;
    if (!dragging.current || !g || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cur = s.get();
    let best: Sample | null = null;
    let bestD = Infinity;
    for (const q of g.samples) {
      if (Math.abs(q.l - cur) > 320 || q.l < g.stops[0] || q.l > g.stops[g.stops.length - 1]) continue;
      const dd = (q.x - x) ** 2 + (q.y - y) ** 2;
      if (dd < bestD) {
        bestD = dd;
        best = q;
      }
    }
    if (!best || best.l === cur) return;
    reverse.current = best.l < cur;
    s.set(best.l);
  };
  const onPointerUp = () => {
    const g = geo.current;
    if (!dragging.current || !g) return;
    dragging.current = false;
    const cur = s.get();
    driveTo(g.stops.reduce((bi, l, i) => (Math.abs(l - cur) < Math.abs(g.stops[bi] - cur) ? i : bi), 0));
  };

  const firstOfPhase = flat.map((m, i) => i === 0 || flat[i - 1].phase !== m.phase);

  return (
    <div ref={wrapRef} className="no-scrollbar hidden overflow-x-auto px-5 pb-4 sm:px-8 lg:block">
      <p className="mx-auto mb-5 flex w-fit items-center gap-3 rounded-full border border-line bg-panel px-4 py-1.5 font-mono text-[11px] text-muted">
        <span>
          <kbd className="rounded border border-line bg-panel2 px-1.5">←</kbd>{" "}
          <kbd className="rounded border border-line bg-panel2 px-1.5">→</kbd> drive
        </span>
        <span aria-hidden>·</span>
        <span>drag the car</span>
        <span aria-hidden>·</span>
        <span>click a card</span>
      </p>
      <div className="relative mx-auto" style={{ width: W, height: H }}>
        <svg ref={svgRef} width={W} height={H} className="absolute inset-0" fill="none">
          <defs>
            <filter id="roadBlur" x="-10%" y="-10%" width="120%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "rgb(var(--muted))" }} />
              <stop offset="40%" style={{ stopColor: "rgb(var(--accent))" }} />
              <stop offset="75%" style={{ stopColor: "rgb(var(--accent-2))" }} />
              <stop offset="100%" style={{ stopColor: "rgb(var(--up))" }} />
            </linearGradient>
            <SceneryDefs />
          </defs>

          {/* roadside landmarks, standing on the verge behind the road */}
          {sights.map(({ phase, x, y, k }) => {
            const g = y - VERGE_Y;
            return (
              <g key={`${phase}-${k}`} transform={`translate(${x} ${g}) scale(${SCENE}) translate(${-x} ${-g})`} aria-hidden>
                {LANDMARKS[phase][k](x, g)}
              </g>
            );
          })}

          {/* road: a raised slab — verge behind, shadow and shaded side below,
              kerbs per phase, asphalt with a lighter far lane, centre line */}
          {pieces.map((p, i) => (
            <path key={`v${i}`} d={pieceD(p)} stroke={PHASE_STYLE[p.phase].verge} strokeWidth={10} transform={`translate(0 ${-VERGE_Y})`} />
          ))}
          <path d={ROUTE} stroke="black" strokeOpacity={0.4} strokeWidth={22} filter="url(#roadBlur)" transform="translate(0 11)" />
          <path d={ROUTE} stroke="#121217" strokeWidth={18} transform="translate(0 7)" />
          <path d={ROUTE} stroke="#26262e" strokeWidth={18} transform="translate(0 4)" />
          {pieces.map((p, i) => (
            <Kerb key={i} d={pieceD(p)} phase={p.phase} />
          ))}
          <path ref={pathRef} d={ROUTE} stroke="#30303a" strokeWidth={12} />
          <path d={ROUTE} stroke="#3d3d48" strokeWidth={4} transform="translate(0 -2.5)" />
          <path d={ROUTE} stroke="white" strokeOpacity={0.5} strokeWidth={1} strokeDasharray="6 8" />
          <path
            ref={trailRef}
            d={ROUTE}
            stroke="url(#trailGrad)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="0 100000"
            style={{ filter: "drop-shadow(0 0 4px rgb(var(--accent) / 0.8))" }}
          />

          {/* start and finish lines */}
          {[pieces[0].pts[0], pieces[pieces.length - 1].pts[1]].map((p, k) => (
            <g key={k} transform={`translate(${p.x - 4} ${p.y - 9})`}>
              {Array.from({ length: 12 }, (_, i) => (
                <rect key={i} x={(i % 2) * 4} y={Math.floor(i / 2) * 3} width={4} height={3} fill={(i + Math.floor(i / 2)) % 2 ? "#111" : "white"} />
              ))}
            </g>
          ))}

          {/* marshal flags at each stop */}
          {pos.map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y - 9})`}>
              <rect x={-0.75} y={-20} width={1.5} height={20} fill="#d4d4d8" />
              <path d="M 1 -20 L 12 -16.5 L 1 -13 Z" style={{ fill: `rgb(var(${phaseMeta[flat[i].phase].varName}))` }}>
                {active === i && (
                  <animate attributeName="d" values="M 1 -20 L 12 -16.5 L 1 -13 Z;M 1 -20 L 11 -15 L 1 -13 Z;M 1 -20 L 12 -16.5 L 1 -13 Z" dur="0.6s" repeatCount="indefinite" />
                )}
              </path>
              {active === i && <circle cx={6} cy={-16.5} r={10} style={{ fill: "rgb(var(--accent))" }} opacity={0.18} />}
            </g>
          ))}

          {/* the car */}
          <g
            ref={carRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none", opacity: ready ? 1 : 0 }}
            role="img"
            aria-label="F1 car — drag it along the road"
          >
            <g ref={speedRef} opacity={0}>
              {[-30, -20, -10].map((y, i) => (
                <rect key={y} x={-130 + i * 8} y={y} width={30 - i * 5} height={3} rx={1.5} fill="white" opacity={0.75} />
              ))}
            </g>
            <SideF1 rearWheelRef={rearRef} frontWheelRef={frontRef} />
          </g>
        </svg>

        {/* phase labels, above the road where each phase starts */}
        {flat.map((m, i) => {
          if (!firstOfPhase[i]) return null;
          const meta = phaseMeta[m.phase];
          const row = rows.find((r) => r.idx.includes(i))!;
          const p = pos[i];
          return (
            <span
              key={m.phase}
              className={`absolute inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white backdrop-blur-sm`}
              style={{
                top: p.y - HEAD + 4,
                left: row.ltr ? p.x - CARD_W / 2 + 6 : undefined,
                right: row.ltr ? undefined : W - (p.x + CARD_W / 2 - 6),
              }}
            >
              <span style={{ color: `rgb(var(${meta.varName}))` }}>
                <PhaseIcon phase={m.phase} />
              </span>
              {meta.label}
            </span>
          );
        })}

        {/* cards hanging below each stop */}
        {flat.map((m, i) => (
          <div
            key={m.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute"
            style={{ left: pos[i].x - CARD_W / 2, top: pos[i].y + 18, width: CARD_W }}
          >
            <Card m={m} lit={active === i} onDrive={() => driveTo(i)} />
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {active !== null ? `Stopped at ${flat[active].title}, ${flat[active].period}` : ""}
      </p>
    </div>
  );
}

/* ------------------- narrow screens: slim top-down road ------------------- */
// a thin road down the left edge, kerbed in each phase's colours; the car
// follows the page scroll and lights the card beside it
const M_ROAD_W = 14;
const M_ROAD_X = 11; // road centre from the container's left edge
const M_CAR_W = 25;
const M_CAR_H = 58;
const M_INDENT = 36; // card list indent

function kerbGradient(colors: string[]) {
  const stops = colors.map((c, i) => `${c} ${i * 6}px ${(i + 1) * 6}px`).join(", ");
  return `repeating-linear-gradient(to bottom, ${stops})`;
}

function TopRoad() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const centres = useRef<number[]>([]);
  const height = useRef(0);
  const carY = useMotionValue(0);
  const [active, setActive] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 65%", "end 65%"] });

  // measure each card's vertical centre relative to the road
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const top = wrap.getBoundingClientRect().top;
      height.current = wrap.offsetHeight;
      centres.current = itemRefs.current.map((el) => {
        if (!el) return -1;
        const r = el.getBoundingClientRect();
        return r.top - top + r.height / 2;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const y = p * (height.current - M_CAR_H);
    carY.set(y);
    const carMid = y + M_CAR_H / 2;
    let best: number | null = null;
    centres.current.forEach((c, i) => {
      if (Math.abs(c - carMid) < 48 && (best === null || Math.abs(c - carMid) < Math.abs(centres.current[best] - carMid))) best = i;
    });
    setActive(best);
  });

  let idx = -1;
  return (
    <div className="mx-auto w-full max-w-content px-5 sm:px-8 lg:hidden">
      <div ref={wrapRef} className="relative">
        <motion.svg
          aria-hidden
          width={M_CAR_W}
          height={M_CAR_H}
          viewBox="-20 -46 40 92"
          className="absolute left-0 top-0 z-10"
          style={{ x: M_ROAD_X - M_CAR_W / 2, y: carY }}
        >
          <TopF1 />
        </motion.svg>

        {groups.map((g, k) => {
          const meta = phaseMeta[g.phase];
          const kerb = PHASE_STYLE[g.phase].kerb;
          return (
            <div key={g.phase} className={`relative ${k === 0 ? "pt-1" : "pt-8"} ${k === groups.length - 1 ? "pb-2" : ""}`} style={{ paddingLeft: M_INDENT }}>
              {/* this phase's stretch of road */}
              <div
                aria-hidden
                className="absolute bottom-0 top-0 rounded-[2px]"
                style={{ left: M_ROAD_X - M_ROAD_W / 2, width: M_ROAD_W, background: kerbGradient(kerb) }}
              >
                <div className="absolute inset-y-0 left-[2px] right-[2px] bg-[#2f2f38]" />
                <div
                  className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                  style={{ background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.55) 0 6px, transparent 6px 14px)" }}
                />
              </div>
              <span className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] ${meta.text}`}>
                <PhaseIcon phase={g.phase} />
                {meta.label}
              </span>
              <ol className="mt-3 space-y-3">
                {g.items.map((m) => {
                  const i = ++idx;
                  return (
                    <li key={m.title} ref={(el) => { itemRefs.current[i] = el; }} className="relative">
                      <span
                        aria-hidden
                        className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ring-2 ring-white"
                        style={{ left: M_ROAD_X - M_INDENT - 5, background: `rgb(var(${meta.varName}))` }}
                      />
                      <Card m={m} lit={active === i} />
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="journey" className="border-t border-line bg-panel2/40 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            03 — Journey
          </span>
          <h2 className="mt-3 font-serif text-3xl font-light tracking-tight sm:text-5xl">
            From economics to engineering
          </h2>
          <p className="mt-4 text-muted">
            Four chapters — a finance &amp; economics career in Taiwan, a foundation-building
            pivot, an MSc in Birmingham, and now a new start in London. Take the wheel.
          </p>
        </header>
      </div>

      <div className="mt-10">
        <SideSnake />
        <TopRoad />
      </div>

      <Footer />
    </section>
  );
}
