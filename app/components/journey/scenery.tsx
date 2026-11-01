import type { ReactNode } from "react";
import type { Phase } from "../../data";

/*
 * Roadside landmarks for the journey track. Each phase of the timeline has its
 * own places — Kaohsiung, the Ontario countryside into Toronto, Birmingham
 * (campus, canals, the Bullring) and London ending at Battersea — drawn standing
 * on a ground line G and centred on x. Buildings are two-tone (a lit face and a
 * shaded face) with a contact shadow, and each scene has a low, faded skyline or
 * treeline behind it for depth. Colours are fixed: it is an illustration, the
 * same in both themes.
 */

export type PhaseStyle = {
  /** kerb blocks repeat through these colours */
  kerb: string[];
  /** the verge behind the road */
  verge: string;
};

export const PHASE_STYLE: Record<Phase, PhaseStyle> = {
  "Finance & economics": { kerb: ["#e23b3b", "#ffffff"], verge: "#4f8f55" },
  Foundation: { kerb: ["#e23b3b", "#ffffff"], verge: "#5c9a4f" },
  Birmingham: { kerb: ["#facc15", "#18181b"], verge: "#6b7558" },
  London: { kerb: ["#1d4ed8", "#ffffff", "#dc2626"], verge: "#52505c" },
};

type L = (x: number, G: number) => ReactNode;

const base = (x: number, G: number, w: number) => (
  <ellipse cx={x} cy={G} rx={w / 2 + 6} ry={5} fill="black" opacity={0.28} />
);

/** small deterministic random numbers, so the server and client draw the same scene */
function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
}

/** a grid of windows; every so often one is lit */
function windows(x0: number, y0: number, cols: number, rows: number, w: number, h: number, gx: number, gy: number, dark: string, lit = "#fde68a", seed = 1) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => (
      <rect key={`${r}-${c}`} x={x0 + c * gx} y={y0 + r * gy} width={w} height={h} fill={(r * 7 + c * 3 + seed) % 6 === 0 ? lit : dark} />
    ))
  );
}

/** ids for the shared patterns and clips; rendered once inside the track's <defs> */
export function SceneryDefs() {
  return (
    <>
      <pattern id="sceneWin" width="10" height="16" patternUnits="userSpaceOnUse">
        <rect x="3" y="4" width="4" height="6" fill="#e2e8f0" opacity="0.45" />
      </pattern>
      <clipPath id="selfridgesClip">
        <path d={SELFRIDGES_D} />
      </clipPath>
    </>
  );
}

/* ------------------------------- backdrops ------------------------------- */
/** a strip of low buildings behind a scene, faded back for depth */
const blocks = (seed: number, colors: string[], hmin: number, hmax: number): L => (x, G) => {
  const r = rng(seed);
  const out: ReactNode[] = [];
  for (let bx = x - 330; bx < x + 320; ) {
    const w = 26 + r() * 30;
    const h = hmin + r() * (hmax - hmin);
    const c = colors[Math.floor(r() * colors.length)];
    out.push(
      <g key={bx}>
        <rect x={bx} y={G - h} width={w - 3} height={h} fill={c} />
        <rect x={bx + 4} y={G - h + 6} width={w - 11} height={h - 14} fill="url(#sceneWin)" />
      </g>
    );
    bx += w;
  }
  return <g opacity={0.5}>{out}</g>;
};

/** a line of trees behind a scene */
const treeline = (seed: number): L => (x, G) => {
  const r = rng(seed);
  const out: ReactNode[] = [];
  for (let tx = x - 320; tx < x + 320; tx += 18 + r() * 16) {
    const h = 40 + r() * 46;
    out.push(
      r() < 0.45 ? (
        <polygon key={tx} points={`${tx - h * 0.28},${G} ${tx},${G - h * 1.25} ${tx + h * 0.28},${G}`} fill="#2c5039" />
      ) : (
        <circle key={tx} cx={tx} cy={G - h * 0.55} r={h * 0.45} fill={r() < 0.5 ? "#355f45" : "#3f6d47"} />
      )
    );
  }
  return <g opacity={0.6}>{out}</g>;
};

/* ------------------------------- Kaohsiung ------------------------------- */
const palm: L = (x, G) => {
  const top = G - 130;
  return (
    <g>
      {base(x, G, 26)}
      <path d={`M ${x} ${G} Q ${x + 12} ${G - 70} ${x + 6} ${top}`} stroke="#6b4f2a" strokeWidth={6} fill="none" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M ${x - 1} ${G - 18 - i * 18} l 12 -3`} stroke="#4a3620" strokeWidth={2} />
      ))}
      {[-170, -135, -100, -60, -20, 20, 55, 90].map((a) => {
        const c = Math.cos((a * Math.PI) / 180);
        return (
          <path
            key={a}
            d={`M ${x + 6} ${top} q ${c * 26} ${-16} ${c * 50} ${Math.abs(c) * 4 + 22}`}
            stroke={a % 3 ? "#2f7d4a" : "#246b3c"}
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={x + 6} cy={top + 4} r={5} fill="#6b4f2a" />
    </g>
  );
};

/** 85 Sky Tower: two legs that join into a single tower, with an open gap between them */
const skyTower85: L = (x, G) => {
  const lit = "#5b7a96", shade = "#465f78", band = "#9fbad0";
  const part = (x0: number, x1: number, y0: number, y1: number, k: string | number) => (
    <g key={k}>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={lit} />
      <rect x={(x0 + x1) / 2} y={y0} width={(x1 - x0) / 2} height={y1 - y0} fill={shade} />
      {Array.from({ length: Math.floor((y1 - y0) / 11) }, (_, i) => (
        <rect key={i} x={x0 + 2} y={y0 + 5 + i * 11} width={x1 - x0 - 4} height={2} fill={band} opacity={0.5} />
      ))}
    </g>
  );
  return (
    <g>
      {base(x, G, 120)}
      {part(x - 58, x - 20, G - 185, G, "l")}
      {part(x + 20, x + 58, G - 185, G, "r")}
      {part(x - 58, x + 58, G - 218, G - 185, "j")}
      {part(x - 32, x + 32, G - 300, G - 218, "t")}
      {part(x - 20, x + 20, G - 332, G - 300, "u")}
      <rect x={x - 11} y={G - 348} width={22} height={16} fill={shade} />
      <rect x={x - 2} y={G - 372} width={4} height={24} fill="#cbd5e1" />
      <circle cx={x} cy={G - 372} r={3} fill="#ef4444" />
      {/* the open archway under the legs */}
      <path d={`M ${x - 20} ${G} L ${x - 20} ${G - 160} Q ${x} ${G - 178} ${x + 20} ${G - 160} L ${x + 20} ${G}`} fill="none" stroke="#3a4f64" strokeWidth={3} />
    </g>
  );
};

/** Kaohsiung townhouses (透天厝): narrow tiled houses, balconies, shop signs and rooftop tanks */
const townhouses: L = (x, G) => {
  const cols = ["#e9dfcf", "#cfd8dc", "#f0dcc0", "#d7cfc4", "#e3e7d3"];
  const floors = [5, 4, 5, 3, 4];
  const signs = ["#dc2626", "#f59e0b", "#2563eb", "#16a34a", "#dc2626"];
  return (
    <g>
      {base(x, G, 180)}
      {cols.map((c, i) => {
        const bx = x - 90 + i * 36;
        const h = floors[i] * 26 + 8;
        return (
          <g key={i}>
            <rect x={bx} y={G - h} width={35} height={h} fill={c} />
            <rect x={bx + 27} y={G - h} width={8} height={h} fill="black" opacity={0.12} />
            {/* rooftop sheet-metal shed and water tank */}
            <polygon points={`${bx + 2},${G - h} ${bx + 2},${G - h - 10} ${bx + 24},${G - h - 14} ${bx + 24},${G - h}`} fill="#9ca3af" />
            <rect x={bx + 26} y={G - h - 12} width={7} height={12} rx={2} fill="#e5e7eb" />
            {/* floors: balcony rail and grilled windows */}
            {Array.from({ length: floors[i] - 1 }, (_, f) => {
              const fy = G - h + 8 + f * 26;
              return (
                <g key={f}>
                  <rect x={bx + 5} y={fy + 3} width={17} height={14} fill="#475569" />
                  {[0, 1, 2, 3].map((v) => (
                    <rect key={v} x={bx + 7 + v * 4} y={fy + 3} width={1.2} height={14} fill="#cbd5e1" />
                  ))}
                  <rect x={bx + 2} y={fy + 18} width={31} height={2.5} fill="#94a3b8" />
                  {f % 2 === 0 && <rect x={bx + 25} y={fy + 9} width={7} height={5} fill="#f8fafc" />}
                </g>
              );
            })}
            {/* ground floor shop: rolling shutter and a vertical sign */}
            <rect x={bx + 3} y={G - 24} width={29} height={24} fill="#6b7280" />
            {[0, 1, 2, 3, 4].map((v) => (
              <rect key={v} x={bx + 3} y={G - 22 + v * 4.5} width={29} height={1} fill="#9ca3af" />
            ))}
            <rect x={bx + 29} y={G - 70} width={8} height={34} fill={signs[i]} />
            <rect x={bx + 31} y={G - 66} width={4} height={26} fill="white" opacity={0.55} />
          </g>
        );
      })}
    </g>
  );
};

/** a pagoda of the Dragon and Tiger Pagodas at Lotus Pond */
function pagoda(x: number, G: number, mouth: string) {
  return (
    <g>
      {Array.from({ length: 7 }, (_, i) => {
        const w = 44 - i * 4.5;
        const y = G - 12 - (i + 1) * 23;
        return (
          <g key={i}>
            <rect x={x - w / 2} y={y} width={w} height={23} fill="#f2d27a" />
            <rect x={x} y={y} width={w / 2} height={23} fill="#d9b55c" />
            <rect x={x - 4} y={y + 7} width={8} height={10} rx={4} fill="#7c2d12" />
            <path d={`M ${x - w / 2 - 9} ${y + 2} Q ${x - w / 2} ${y + 1} ${x - w / 2 + 3} ${y - 4} L ${x + w / 2 - 3} ${y - 4} Q ${x + w / 2} ${y + 1} ${x + w / 2 + 9} ${y + 2} Z`} fill="#b8381f" />
          </g>
        );
      })}
      <rect x={x - 1.5} y={G - 12 - 7 * 23 - 20} width={3} height={18} fill="#f59e0b" />
      {/* the dragon's or tiger's mouth at the base */}
      <rect x={x - 24} y={G - 14} width={48} height={14} fill="#e7c76c" />
      <circle cx={x} cy={G - 10} r={8} fill={mouth} />
      <circle cx={x} cy={G - 10} r={4} fill="#1f2937" />
    </g>
  );
}

const dragonTiger: L = (x, G) => (
  <g>
    {base(x, G, 200)}
    <rect x={x - 130} y={G - 6} width={260} height={6} fill="#4d8fb0" />
    {[-110, -70, 70, 112].map((dx) => (
      <circle key={dx} cx={x + dx} cy={G - 5} r={4} fill="#f472b6" />
    ))}
    {pagoda(x - 42, G, "#16a34a")}
    {pagoda(x + 42, G, "#f59e0b")}
    {/* zigzag bridge */}
    <path d={`M ${x - 130} ${G - 8} L ${x - 105} ${G - 14} L ${x - 80} ${G - 8} L ${x - 64} ${G - 14} M ${x + 64} ${G - 14} L ${x + 80} ${G - 8} L ${x + 105} ${G - 14} L ${x + 130} ${G - 8}`} stroke="#c2410c" strokeWidth={3} fill="none" />
  </g>
);

/** Kaohsiung port: ship-to-shore gantry cranes over stacked containers */
function crane(x: number, G: number) {
  return (
    <g>
      <rect x={x - 26} y={G - 175} width={6} height={175} fill="#c53a2a" />
      <rect x={x + 20} y={G - 175} width={6} height={175} fill="#a32d20" />
      <path d={`M ${x - 23} ${G - 60} L ${x + 23} ${G - 120} M ${x + 23} ${G - 60} L ${x - 23} ${G - 120}`} stroke="#c53a2a" strokeWidth={2.5} />
      <rect x={x - 34} y={G - 182} width={68} height={9} fill="#c53a2a" />
      <rect x={x - 4} y={G - 232} width={8} height={50} fill="#e5e7eb" />
      <rect x={x - 80} y={G - 190} width={175} height={6} fill="#e5e7eb" />
      <path d={`M ${x} ${G - 232} L ${x + 92} ${G - 190} M ${x} ${G - 232} L ${x - 78} ${G - 190}`} stroke="#cbd5e1" strokeWidth={2} />
      <rect x={x - 28} y={G - 204} width={30} height={14} fill="#f8fafc" />
      <rect x={x + 44} y={G - 184} width={10} height={6} fill="#374151" />
      <line x1={x + 49} y1={G - 178} x2={x + 49} y2={G - 120} stroke="#374151" strokeWidth={1.5} />
    </g>
  );
}

const port: L = (x, G) => {
  const r = rng(85);
  const box = ["#2563eb", "#dc2626", "#f59e0b", "#0f766e", "#9ca3af", "#7c3aed"];
  return (
    <g>
      {base(x, G, 280)}
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 7 - row }, (_, c) => {
          const bx = x - 150 + c * 44 + row * 8 + (c > 2 ? 30 : 0);
          return (
            <g key={`${row}-${c}`}>
              <rect x={bx} y={G - 16 - row * 16} width={42} height={15} fill={box[Math.floor(r() * box.length)]} />
              <rect x={bx} y={G - 16 - row * 16} width={42} height={15} fill="url(#sceneWin)" opacity={0.4} />
            </g>
          );
        })
      )}
      {crane(x - 90, G)}
      {crane(x + 70, G)}
    </g>
  );
};

/* ------------------------ Ontario countryside → Toronto ------------------------ */
const pine = (h: number): L => (x, G) => {
  const w = h * 0.38;
  return (
    <g>
      {base(x, G, w * 1.4)}
      <rect x={x - 3} y={G - h * 0.16} width={6} height={h * 0.16} fill="#5b3a1e" />
      {[0, 1, 2, 3].map((i) => {
        const b = G - h * 0.13 - i * h * 0.2;
        const ww = w * (1 - i * 0.2);
        return (
          <g key={i}>
            <polygon points={`${x - ww},${b} ${x},${b - h * 0.36} ${x},${b}`} fill="#2f6b45" />
            <polygon points={`${x},${b} ${x},${b - h * 0.36} ${x + ww},${b}`} fill="#24573a" />
          </g>
        );
      })}
    </g>
  );
};

const maple: L = (x, G) => (
  <g>
    {base(x, G, 60)}
    <path d={`M ${x - 3} ${G} L ${x - 2} ${G - 60} L ${x + 2} ${G - 60} L ${x + 4} ${G} Z`} fill="#5b3a1e" />
    <path d={`M ${x} ${G - 52} L ${x - 16} ${G - 74} M ${x} ${G - 56} L ${x + 14} ${G - 80}`} stroke="#5b3a1e" strokeWidth={3} />
    <circle cx={x} cy={G - 96} r={30} fill="#ea580c" />
    <circle cx={x - 24} cy={G - 76} r={22} fill="#dc2626" />
    <circle cx={x + 24} cy={G - 80} r={22} fill="#f59e0b" />
    <circle cx={x + 6} cy={G - 112} r={17} fill="#fb923c" />
    <circle cx={x - 12} cy={G - 104} r={12} fill="#c2410c" />
  </g>
);

const fence = (x0: number, x1: number, G: number) => (
  <g>
    {Array.from({ length: Math.floor((x1 - x0) / 20) + 1 }, (_, i) => (
      <rect key={i} x={x0 + i * 20} y={G - 18} width={3} height={18} fill="#e7e5e4" />
    ))}
    <rect x={x0} y={G - 15} width={x1 - x0} height={2} fill="#e7e5e4" />
    <rect x={x0} y={G - 8} width={x1 - x0} height={2} fill="#e7e5e4" />
  </g>
);

const farm: L = (x, G) => (
  <g>
    {base(x, G, 250)}
    {/* silo */}
    <rect x={x + 62} y={G - 130} width={34} height={130} fill="#c7cbd1" />
    <rect x={x + 79} y={G - 130} width={17} height={130} fill="#a8adb5" />
    {[1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={x + 62} y={G - i * 24} width={34} height={2} fill="#8b9098" />
    ))}
    <path d={`M ${x + 62} ${G - 130} Q ${x + 79} ${G - 152} ${x + 96} ${G - 130} Z`} fill="#9ca3af" />
    {/* gambrel-roofed barn */}
    <rect x={x - 70} y={G - 72} width={120} height={72} fill="#b33a2c" />
    <rect x={x - 10} y={G - 72} width={60} height={72} fill="#9a2f23" />
    {Array.from({ length: 11 }, (_, i) => (
      <rect key={i} x={x - 66 + i * 11} y={G - 72} width={1.2} height={72} fill="#7f1d1d" opacity={0.6} />
    ))}
    <polygon points={`${x - 76},${G - 72} ${x - 58},${G - 108} ${x - 10},${G - 126} ${x + 38},${G - 108} ${x + 56},${G - 72}`} fill="#3f3f46" />
    <rect x={x - 32} y={G - 48} width={44} height={48} fill="#7f1d1d" stroke="white" strokeWidth={3} />
    <path d={`M ${x - 32} ${G - 48} L ${x + 12} ${G} M ${x + 12} ${G - 48} L ${x - 32} ${G}`} stroke="white" strokeWidth={3} />
    <rect x={x - 20} y={G - 100} width={20} height={16} fill="white" />
    {/* hay bales and a fence */}
    {[-140, -112].map((dx) => (
      <g key={dx}>
        <circle cx={x + dx} cy={G - 14} r={14} fill="#e0b84c" stroke="#b58a2a" strokeWidth={2} />
        <circle cx={x + dx} cy={G - 14} r={6} fill="none" stroke="#b58a2a" strokeWidth={1.5} />
      </g>
    ))}
    {fence(x + 110, x + 200, G)}
  </g>
);

const farmhouse: L = (x, G) => (
  <g>
    {base(x, G, 130)}
    <rect x={x - 60} y={G - 70} width={120} height={70} fill="#f5f5f4" />
    <rect x={x + 10} y={G - 70} width={50} height={70} fill="#d6d3d1" />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={x - 60} y={G - 66 + i * 8} width={120} height={1} fill="#a8a29e" opacity={0.6} />
    ))}
    <polygon points={`${x - 68},${G - 70} ${x},${G - 112} ${x + 68},${G - 70}`} fill="#44403c" />
    <rect x={x + 30} y={G - 112} width={10} height={26} fill="#9a3412" />
    {windows(x - 48, G - 58, 4, 2, 14, 14, 28, 26, "#57534e", "#fde68a", 2)}
    <rect x={x - 66} y={G - 22} width={132} height={4} fill="#78716c" />
    {[-60, -30, 30, 60].map((dx) => (
      <rect key={dx} x={x + dx - 1.5} y={G - 20} width={3} height={20} fill="#e7e5e4" />
    ))}
  </g>
);

/** a highway sign: the road into the city */
const sign: L = (x, G) => (
  <g>
    <rect x={x - 30} y={G - 90} width={4} height={90} fill="#9ca3af" />
    <rect x={x + 26} y={G - 90} width={4} height={90} fill="#9ca3af" />
    <rect x={x - 44} y={G - 118} width={88} height={34} rx={4} fill="#166534" stroke="white" strokeWidth={2} />
    <text x={x} y={G - 97} textAnchor="middle" fontSize={15} fontWeight={700} fill="white" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing={1}>
      TORONTO
    </text>
  </g>
);

const cnTower: L = (x, G) => (
  <g>
    {base(x, G, 60)}
    <path d={`M ${x - 24} ${G} L ${x - 7} ${G - 110} L ${x - 5} ${G - 270} L ${x + 5} ${G - 270} L ${x + 7} ${G - 110} L ${x + 24} ${G} Z`} fill="#d6d3d1" />
    <path d={`M ${x} ${G} L ${x} ${G - 270} L ${x + 5} ${G - 270} L ${x + 7} ${G - 110} L ${x + 24} ${G} Z`} fill="#b8b3ad" />
    {/* main pod */}
    <path d={`M ${x - 12} ${G - 262} L ${x - 24} ${G - 274} L ${x - 20} ${G - 290} L ${x + 20} ${G - 290} L ${x + 24} ${G - 274} L ${x + 12} ${G - 262} Z`} fill="#a8a29e" />
    <rect x={x - 22} y={G - 284} width={44} height={6} fill="#1e293b" />
    <rect x={x - 22} y={G - 284} width={44} height={6} fill="url(#sceneWin)" />
    <rect x={x - 4} y={G - 330} width={8} height={40} fill="#d6d3d1" />
    <rect x={x - 7} y={G - 340} width={14} height={10} fill="#a8a29e" />
    <rect x={x - 2} y={G - 392} width={4} height={52} fill="#e7e5e4" />
    <circle cx={x} cy={G - 392} r={3} fill="#ef4444" />
  </g>
);

const rogersCentre: L = (x, G) => (
  <g>
    {base(x, G, 160)}
    <rect x={x - 80} y={G - 28} width={160} height={28} fill="#e7e5e4" />
    <rect x={x + 20} y={G - 28} width={60} height={28} fill="#c9c5c0" />
    {Array.from({ length: 12 }, (_, i) => (
      <rect key={i} x={x - 76 + i * 13} y={G - 22} width={7} height={14} fill="#57534e" />
    ))}
    <path d={`M ${x - 78} ${G - 28} Q ${x - 70} ${G - 82} ${x} ${G - 86} Q ${x + 70} ${G - 82} ${x + 78} ${G - 28} Z`} fill="#cbd5e1" />
    {[-52, -26, 0, 26, 52].map((dx) => (
      <path key={dx} d={`M ${x + dx * 1.3} ${G - 28} Q ${x + dx} ${G - 70} ${x + dx * 0.5} ${G - 85}`} stroke="#94a3b8" strokeWidth={1.5} fill="none" />
    ))}
  </g>
);

/** a glass condo tower */
const tower = (w: number, h: number, glass: string, shade: string, seed: number): L => (x, G) => (
  <g>
    {base(x, G, w)}
    <rect x={x - w / 2} y={G - h} width={w} height={h} fill={glass} />
    <rect x={x + w / 6} y={G - h} width={w / 3} height={h} fill={shade} />
    {windows(x - w / 2 + 4, G - h + 6, Math.floor((w - 6) / 8), Math.floor((h - 10) / 10), 4, 5, 8, 10, "#1e293b", "#fde68a", seed)}
  </g>
);

/* ------------------------------- Birmingham ------------------------------ */
function smoke(x: number, y: number) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x} cy={y} r={6} fill="#e5e7eb" opacity={0}>
          <animate attributeName="cy" values={`${y};${y - 70}`} dur="4.5s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
          <animate attributeName="cx" values={`${x};${x + 26}`} dur="4.5s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
          <animate attributeName="r" values="6;18" dur="4.5s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="4.5s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </g>
  );
}

/** Old Joe, the campus clock tower */
const oldJoe: L = (x, G) => (
  <g>
    {base(x, G, 36)}
    <rect x={x - 14} y={G - 250} width={28} height={250} fill="#b4603f" />
    <rect x={x} y={G - 250} width={14} height={250} fill="#97492e" />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={x - 4} y={G - 200 + i * 24} width={8} height={12} rx={4} fill="#3f2a22" />
    ))}
    <rect x={x - 17} y={G - 262} width={34} height={14} fill="#9a4a32" />
    <polygon points={`${x - 14},${G - 262} ${x},${G - 320} ${x},${G - 262}`} fill="#7c8593" />
    <polygon points={`${x},${G - 262} ${x},${G - 320} ${x + 14},${G - 262}`} fill="#5b6472" />
    <circle cx={x} cy={G - 230} r={9} fill="#f8fafc" stroke="#374151" strokeWidth={2} />
    <path d={`M ${x} ${G - 230} L ${x} ${G - 236} M ${x} ${G - 230} L ${x + 4} ${G - 228}`} stroke="#111" strokeWidth={1.5} />
  </g>
);

/** the Aston Webb building: red brick with a central dome */
const astonWebb: L = (x, G) => (
  <g>
    {base(x, G, 200)}
    <rect x={x - 100} y={G - 70} width={200} height={70} fill="#b25a3c" />
    <rect x={x + 30} y={G - 70} width={70} height={70} fill="#9a4a32" />
    <rect x={x - 100} y={G - 74} width={200} height={6} fill="#d6b79a" />
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} d={`M ${x - 92 + i * 21} ${G - 18} L ${x - 92 + i * 21} ${G - 46} Q ${x - 86 + i * 21} ${G - 54} ${x - 80 + i * 21} ${G - 46} L ${x - 80 + i * 21} ${G - 18} Z`} fill="#3f2a22" />
    ))}
    <rect x={x - 34} y={G - 104} width={68} height={32} fill="#b25a3c" />
    <path d={`M ${x - 32} ${G - 104} A 32 32 0 0 1 ${x + 32} ${G - 104} Z`} fill="#6b8580" />
    <path d={`M ${x} ${G - 136} A 32 32 0 0 1 ${x + 32} ${G - 104} L ${x} ${G - 104} Z`} fill="#56706b" />
    <rect x={x - 3} y={G - 152} width={6} height={16} fill="#6b8580" />
  </g>
);

const terraces: L = (x, G) => (
  <g>
    {base(x, G, 150)}
    {[0, 1, 2, 3].map((i) => {
      const bx = x - 84 + i * 42;
      return (
        <g key={i}>
          <rect x={bx} y={G - 64} width={41} height={64} fill={i % 2 ? "#a85a3c" : "#9a4a32"} />
          <polygon points={`${bx - 2},${G - 64} ${bx + 20},${G - 82} ${bx + 43},${G - 64}`} fill="#4b3a36" />
          <rect x={bx + 28} y={G - 90} width={6} height={14} fill="#7a3426" />
          <rect x={bx + 6} y={G - 52} width={10} height={12} fill="#e7e2d6" />
          <rect x={bx + 24} y={G - 52} width={10} height={12} fill="#e7e2d6" />
          <rect x={bx + 6} y={G - 26} width={10} height={12} fill="#fde68a" opacity={0.8} />
          <rect x={bx + 24} y={G - 24} width={9} height={24} fill="#1f2937" />
        </g>
      );
    })}
  </g>
);

/** canal-side mill with chimneys, a towpath bridge and a narrowboat */
const canal: L = (x, G) => (
  <g>
    {base(x, G, 260)}
    {/* mill */}
    <rect x={x - 120} y={G - 200} width={16} height={200} fill="#8b3d2b" />
    <rect x={x - 112} y={G - 200} width={8} height={200} fill="#6f2f21" />
    <rect x={x - 66} y={G - 170} width={14} height={170} fill="#8b3d2b" />
    <rect x={x - 59} y={G - 170} width={7} height={170} fill="#6f2f21" />
    {smoke(x - 112, G - 206)}
    {smoke(x - 59, G - 176)}
    <rect x={x - 140} y={G - 92} width={130} height={92} fill="#8f4a34" />
    <rect x={x - 60} y={G - 92} width={50} height={92} fill="#7a3d2a" />
    <path
      d={`M ${x - 140} ${G - 92} ${Array.from({ length: 4 }, (_, i) => `L ${x - 140 + i * 32.5} ${G - 118} L ${x - 140 + (i + 1) * 32.5} ${G - 92}`).join(" ")}`}
      fill="#4b4f58"
    />
    {windows(x - 132, G - 80, 7, 3, 9, 13, 17, 24, "#3f2a22", "#fde68a", 4)}
    {/* canal, arch bridge and narrowboat */}
    <rect x={x - 10} y={G - 6} width={150} height={6} fill="#3d6f7d" />
    <path d={`M ${x + 90} ${G} L ${x + 90} ${G - 30} L ${x + 150} ${G - 30} L ${x + 150} ${G} L ${x + 136} ${G} A 16 16 0 0 0 ${x + 104} ${G} Z`} fill="#a85a3c" />
    <rect x={x - 4} y={G - 16} width={88} height={10} rx={3} fill="#14532d" />
    <rect x={x + 6} y={G - 24} width={66} height={9} fill="#b91c1c" />
    {windows(x + 10, G - 22, 6, 1, 6, 5, 10, 0, "#fde68a", "#fde68a")}
    <rect x={x + 50} y={G - 30} width={4} height={6} fill="#1f2937" />
  </g>
);

/** Selfridges at the Bullring: a blue blob covered in aluminium discs */
const SELFRIDGES_D =
  "M 0 0 C -6 -40 0 -86 40 -100 C 80 -112 130 -108 160 -86 C 186 -66 184 -24 176 0 Z";
const selfridges: L = (x, G) => {
  const ox = x - 88;
  return (
    <g>
      {base(x, G, 180)}
      <g transform={`translate(${ox} ${G})`}>
        <path d={SELFRIDGES_D} fill="#2347a0" />
        <g clipPath="url(#selfridgesClip)">
          <rect x={100} y={-120} width={100} height={120} fill="black" opacity={0.18} />
          {Array.from({ length: 11 }, (_, r) =>
            Array.from({ length: 19 }, (_, c) => (
              <circle key={`${r}-${c}`} cx={c * 10 + (r % 2) * 5} cy={-4 - r * 10} r={3.6} fill="#dbe4f0" opacity={0.9} />
            ))
          )}
        </g>
      </g>
    </g>
  );
};

/** St Martin in the Bull Ring: a sandstone church with a tall spire */
const stMartins: L = (x, G) => (
  <g>
    {base(x, G, 130)}
    <rect x={x - 70} y={G - 60} width={100} height={60} fill="#a1856b" />
    <polygon points={`${x - 74},${G - 60} ${x - 20},${G - 88} ${x + 34},${G - 60}`} fill="#5d5249" />
    {[-56, -36, -16, 4].map((dx) => (
      <path key={dx} d={`M ${x + dx} ${G - 14} L ${x + dx} ${G - 40} Q ${x + dx + 5} ${G - 48} ${x + dx + 10} ${G - 40} L ${x + dx + 10} ${G - 14} Z`} fill="#3b3631" />
    ))}
    <rect x={x + 30} y={G - 140} width={36} height={140} fill="#a1856b" />
    <rect x={x + 48} y={G - 140} width={18} height={140} fill="#8a6f57" />
    <path d={`M ${x + 40} ${G - 110} L ${x + 40} ${G - 126} Q ${x + 48} ${G - 136} ${x + 56} ${G - 126} L ${x + 56} ${G - 110} Z`} fill="#3b3631" />
    <polygon points={`${x + 30},${G - 140} ${x + 48},${G - 262} ${x + 48},${G - 140}`} fill="#a1856b" />
    <polygon points={`${x + 48},${G - 140} ${x + 48},${G - 262} ${x + 66},${G - 140}`} fill="#8a6f57" />
    {[30, 66].map((dx) => (
      <polygon key={dx} points={`${x + dx - 4},${G - 140} ${x + dx},${G - 160} ${x + dx + 4},${G - 140}`} fill="#8a6f57" />
    ))}
  </g>
);

const rotunda: L = (x, G) => (
  <g>
    {base(x, G, 70)}
    <rect x={x - 34} y={G - 230} width={68} height={230} rx={30} fill="#94a3b8" />
    <rect x={x + 6} y={G - 226} width={26} height={222} rx={13} fill="#7b8a9f" />
    {Array.from({ length: 19 }, (_, i) => (
      <rect key={i} x={x - 30} y={G - 214 + i * 11} width={60} height={5} fill={i % 5 === 2 ? "#fde68a" : "#dbe4ee"} opacity={0.75} />
    ))}
    <rect x={x - 26} y={G - 240} width={52} height={10} fill="#64748b" />
  </g>
);

/* --------------------------------- London -------------------------------- */
/** the Houses of Parliament with Elizabeth Tower at their right-hand end */
const westminster: L = (x, G) => (
  <g>
    {base(x - 60, G, 220)}
    <rect x={x - 180} y={G - 84} width={162} height={84} fill="#a08a63" />
    <rect x={x - 180} y={G - 28} width={162} height={28} fill="#857150" />
    {Array.from({ length: 13 }, (_, i) => (
      <rect key={i} x={x - 176 + i * 12.5} y={G - 96} width={4} height={14} fill="#8a7553" />
    ))}
    {Array.from({ length: 13 }, (_, i) => (
      <rect key={`w${i}`} x={x - 174 + i * 12.5} y={G - 74} width={5} height={36} fill={i % 3 ? "#5c4d37" : "#fcd34d"} opacity={0.8} />
    ))}
    {/* Victoria Tower on the left */}
    <rect x={x - 196} y={G - 150} width={34} height={150} fill="#a08a63" />
    <rect x={x - 179} y={G - 150} width={17} height={150} fill="#857150" />
    {[-194, -183, -172].map((dx) => (
      <rect key={dx} x={x + dx} y={G - 160} width={4} height={10} fill="#857150" />
    ))}
    {/* Elizabeth Tower */}
    <rect x={x - 15} y={G - 250} width={30} height={250} fill="#a08a63" />
    <rect x={x} y={G - 250} width={15} height={250} fill="#857150" />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={x - 9} y={G - 230 + i * 24} width={4} height={14} fill="#5c4d37" />
    ))}
    <rect x={x - 19} y={G - 272} width={38} height={34} fill="#8a7553" />
    <circle cx={x} cy={G - 256} r={12} fill="#fde68a" />
    <path d={`M ${x} ${G - 256} L ${x} ${G - 264} M ${x} ${G - 256} L ${x + 6} ${G - 254}`} stroke="#422006" strokeWidth={1.5} />
    <polygon points={`${x - 18},${G - 272} ${x},${G - 330} ${x},${G - 272}`} fill="#6b5c42" />
    <polygon points={`${x},${G - 272} ${x},${G - 330} ${x + 18},${G - 272}`} fill="#4f4330" />
  </g>
);

const londonEye: L = (x, G) => {
  const R = 100;
  const cy = G - R - 14;
  return (
    <g>
      {base(x, G, 80)}
      <path d={`M ${x - 36} ${G} L ${x} ${cy} L ${x + 36} ${G}`} stroke="#cbd5e1" strokeWidth={5} fill="none" />
      <circle cx={x} cy={cy} r={R} fill="none" stroke="#e2e8f0" strokeWidth={4} />
      <circle cx={x} cy={cy} r={R - 6} fill="none" stroke="#94a3b8" strokeWidth={1.5} />
      <g>
        <animateTransform attributeName="transform" type="rotate" from={`0 ${x} ${cy}`} to={`360 ${x} ${cy}`} dur="120s" repeatCount="indefinite" />
        {Array.from({ length: 20 }, (_, i) => {
          const a = (i * Math.PI * 2) / 20;
          const px = x + Math.cos(a) * R;
          const py = cy + Math.sin(a) * R;
          return (
            <g key={i}>
              <line x1={x} y1={cy} x2={px} y2={py} stroke="#94a3b8" strokeWidth={1.2} />
              <ellipse cx={px} cy={py} rx={6} ry={4.5} fill="#e9d5ff" />
            </g>
          );
        })}
      </g>
      <circle cx={x} cy={cy} r={6} fill="#cbd5e1" />
    </g>
  );
};

const shard: L = (x, G) => (
  <g>
    {base(x, G, 80)}
    <polygon points={`${x - 40},${G} ${x + 2},${G} ${x + 2},${G - 340} ${x - 4},${G - 328}`} fill="#7c8ea6" />
    <polygon points={`${x + 2},${G} ${x + 40},${G} ${x + 6},${G - 336} ${x + 2},${G - 340}`} fill="#56657a" />
    {Array.from({ length: 22 }, (_, i) => (
      <rect key={i} x={x - 37 + i * 1.6} y={G - 14 - i * 14} width={74 - i * 3.2} height={1.6} fill="#e2e8f0" opacity={0.3} />
    ))}
  </g>
);

const gherkin: L = (x, G) => (
  <g>
    {base(x, G, 60)}
    <path d={`M ${x - 26} ${G} C ${x - 38} ${G - 110} ${x - 16} ${G - 186} ${x} ${G - 200} C ${x + 16} ${G - 186} ${x + 38} ${G - 110} ${x + 26} ${G} Z`} fill="#3f6b5a" />
    <path d={`M ${x} ${G} L ${x} ${G - 200} C ${x + 16} ${G - 186} ${x + 38} ${G - 110} ${x + 26} ${G} Z`} fill="#2f5446" />
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} d={`M ${x - 30} ${G - 14 - i * 20} L ${x + 30} ${G - 34 - i * 20}`} stroke="#86b7a0" strokeWidth={1.5} opacity={0.55} />
    ))}
  </g>
);

const walkieTalkie: L = (x, G) => (
  <g>
    {base(x, G, 70)}
    <path d={`M ${x - 32} ${G} L ${x - 44} ${G - 190} Q ${x - 44} ${G - 206} ${x - 30} ${G - 210} L ${x + 40} ${G - 214} L ${x + 34} ${G} Z`} fill="#64748b" />
    <path d={`M ${x + 4} ${G} L ${x + 6} ${G - 212} L ${x + 40} ${G - 214} L ${x + 34} ${G} Z`} fill="#4b5563" />
    {Array.from({ length: 20 }, (_, i) => (
      <rect key={i} x={x - 34 - i * 0.5} y={G - 14 - i * 10} width={68 + i * 0.9} height={1.5} fill="#cbd5e1" opacity={0.35} />
    ))}
    <path d={`M ${x - 40} ${G - 204} Q ${x} ${G - 224} ${x + 40} ${G - 214}`} stroke="#a7f3d0" strokeWidth={3} fill="none" opacity={0.7} />
  </g>
);

const stPauls: L = (x, G) => (
  <g>
    {base(x, G, 140)}
    <rect x={x - 70} y={G - 60} width={140} height={60} fill="#d6d0c4" />
    <rect x={x + 20} y={G - 60} width={50} height={60} fill="#bdb6a8" />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={x - 64 + i * 13.5} y={G - 54} width={4} height={50} fill="#a8a092" />
    ))}
    <rect x={x - 34} y={G - 104} width={68} height={44} fill="#d6d0c4" />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={x - 30 + i * 8.5} y={G - 100} width={3} height={38} fill="#a8a092" />
    ))}
    <path d={`M ${x - 36} ${G - 104} A 36 40 0 0 1 ${x + 36} ${G - 104} Z`} fill="#7d8a8f" />
    <path d={`M ${x} ${G - 144} A 36 40 0 0 1 ${x + 36} ${G - 104} L ${x} ${G - 104} Z`} fill="#66737a" />
    <rect x={x - 6} y={G - 162} width={12} height={18} fill="#d6d0c4" />
    <rect x={x - 1.5} y={G - 178} width={3} height={16} fill="#f5d36b" />
  </g>
);

/** Battersea Power Station: brick halls and four white chimneys */
const battersea: L = (x, G) => {
  const chim = (cx: number) => (
    <g key={cx}>
      <path d={`M ${cx - 11} ${G - 120} L ${cx - 8} ${G - 268} L ${cx + 8} ${G - 268} L ${cx + 11} ${G - 120} Z`} fill="#f4efe4" />
      <path d={`M ${cx + 1} ${G - 120} L ${cx + 1} ${G - 268} L ${cx + 8} ${G - 268} L ${cx + 11} ${G - 120} Z`} fill="#d9d2c3" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={cx - 4 + i * 4} y={G - 262} width={1.2} height={136} fill="#c9c1b0" />
      ))}
      <rect x={cx - 10} y={G - 274} width={20} height={6} fill="#e7e1d4" />
    </g>
  );
  return (
    <g>
      {base(x, G, 270)}
      {[-104, -64, 64, 104].map((dx) => chim(x + dx))}
      {/* the two boiler houses either side, the turbine hall in the middle */}
      {[-116, 52].map((bx) => (
        <g key={bx}>
          <rect x={x + bx} y={G - 124} width={64} height={124} fill="#a0573f" />
          <rect x={x + bx + 40} y={G - 124} width={24} height={124} fill="#86452f" />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={x + bx + 5 + i * 9.5} y={G - 116} width={2} height={108} fill="#c27a5c" opacity={0.6} />
          ))}
        </g>
      ))}
      <rect x={x - 52} y={G - 100} width={104} height={100} fill="#a85f45" />
      <rect x={x + 18} y={G - 100} width={34} height={100} fill="#8e4c35" />
      {windows(x - 44, G - 88, 8, 4, 7, 14, 12, 22, "#2a1d18", "#fde68a", 3)}
      {/* the new glass roof garden building in front */}
      <rect x={x - 150} y={G - 40} width={300} height={40} fill="#5b6b7d" />
      <rect x={x - 150} y={G - 40} width={300} height={40} fill="url(#sceneWin)" />
      <rect x={x - 150} y={G - 44} width={300} height={4} fill="#4ade80" opacity={0.8} />
    </g>
  );
};

const parkTree: L = (x, G) => (
  <g>
    {base(x, G, 40)}
    <rect x={x - 3} y={G - 44} width={6} height={44} fill="#4a3620" />
    <circle cx={x} cy={G - 66} r={26} fill="#3f7a4a" />
    <circle cx={x + 12} cy={G - 58} r={18} fill="#336a3e" />
    <circle cx={x - 10} cy={G - 80} r={14} fill="#4b8a55" />
  </g>
);

const lamp: L = (x, G) => (
  <g>
    <rect x={x - 1.5} y={G - 70} width={3} height={70} fill="#1f2937" />
    <circle cx={x} cy={G - 74} r={12} fill="#fde68a" opacity={0.22} />
    <circle cx={x} cy={G - 74} r={4} fill="#fde68a" />
  </g>
);

/** several landmarks around one point, offsets in drawing units */
const scene = (...parts: [L, number][]): L => (x, G) => (
  <g>
    {parts.map(([draw, dx], i) => (
      <g key={i}>{draw(x + dx, G)}</g>
    ))}
  </g>
);

const twTones = ["#a3aaa6", "#b8b0a2", "#8d9a9c", "#c1b8a8"];
const brick = ["#8f5a46", "#7d4b3a", "#9b6a55", "#6d6863"];
const city = ["#6b7a8c", "#7e8a99", "#5d6878", "#8b93a0"];

/**
 * Roadside scenes for each phase, used in order in the gaps between its stops.
 * Each fits within about ±320 drawing units of the gap's centre, and stays
 * under ~330 units tall where a phase label sits above it.
 */
export const LANDMARKS: Record<Phase, L[]> = {
  "Finance & economics": [
    scene([blocks(3, twTones, 50, 130), 0], [palm, -270], [townhouses, -140], [palm, 0], [skyTower85, 170], [palm, 270]),
    scene([blocks(7, twTones, 40, 110), 0], [palm, -250], [dragonTiger, -60], [palm, 120], [townhouses, 240]),
    scene([blocks(11, twTones, 40, 100), 0], [port, -70], [palm, 190], [palm, 250]),
  ],
  Foundation: [
    scene([treeline(5), 0], [pine(130), -280], [farm, -40], [pine(110), 240], [pine(150), 280]),
    scene([treeline(9), 0], [maple, -260], [farmhouse, -120], [maple, 30], [pine(120), 110], [sign, 230]),
    scene([blocks(13, city, 60, 160), 0], [tower(44, 200, "#4b6a86", "#3a5570", 1), -270], [rogersCentre, -150], [cnTower, 0], [tower(40, 240, "#5b7d96", "#46647c", 2), 110], [tower(50, 170, "#3f5f78", "#2f4b62", 3), 180], [tower(36, 210, "#6a8aa3", "#56738a", 4), 260]),
  ],
  Birmingham: [
    scene([blocks(17, brick, 40, 100), 0], [astonWebb, -170], [oldJoe, 0], [parkTree, 70], [terraces, 200]),
    scene([blocks(19, brick, 50, 120), 0], [terraces, -230], [canal, 60]),
    scene([blocks(23, city, 60, 150), 0], [rotunda, -230], [stMartins, -100], [selfridges, 120], [lamp, 260]),
  ],
  London: [
    scene([blocks(29, city, 50, 120), 0], [londonEye, -200], [lamp, -60], [westminster, 210]),
    scene([blocks(31, city, 70, 160), 0], [stPauls, -220], [walkieTalkie, -80], [shard, 40], [gherkin, 160], [tower(40, 190, "#6b7a8c", "#566373", 5), 250]),
    scene([blocks(37, city, 40, 110), 0], [parkTree, -280], [parkTree, -240], [battersea, -40], [parkTree, 170], [lamp, 220], [parkTree, 270]),
  ],
};

/* small landmark icons for the phase labels */
export function PhaseIcon({ phase }: { phase: Phase }) {
  const common = { width: 18, height: 18, viewBox: "0 0 18 18", "aria-hidden": true } as const;
  switch (phase) {
    case "Finance & economics": // 85 Sky Tower
      return (
        <svg {...common}>
          <path d="M8.5 1h1v3h1v2h1.5v3H14v8h-3v-6H7v6H4V9h2V6h1.5V4h1z" fill="currentColor" />
        </svg>
      );
    case "Foundation": // CN Tower
      return (
        <svg {...common}>
          <path d="M8.6 1h.8v4h.4v2.5h1.8L10.5 9.5 10 17H8l-.5-7.5L6.4 7.5h1.8V5h.4z" fill="currentColor" />
        </svg>
      );
    case "Birmingham": // Old Joe
      return (
        <svg {...common}>
          <path d="M9 1 7 5h4zM7 5h4v12H7z" fill="currentColor" />
          <circle cx="9" cy="7" r="1.2" fill="white" />
        </svg>
      );
    case "London": // Battersea Power Station
      return (
        <svg {...common}>
          <path d="M2.5 3h1.5v6H2.5zM6 3h1.5v6H6zM10.5 3H12v6h-1.5zM14 3h1.5v6H14zM1.5 9h15v8h-15z" fill="currentColor" />
        </svg>
      );
  }
}
