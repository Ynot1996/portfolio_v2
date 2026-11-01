import type { Ref } from "react";

/**
 * Side-view F1 car facing +x. The origin is the ground contact point under
 * the middle of the car, so it can be placed straight onto the track.
 */
export function SideF1({
  rearWheelRef,
  frontWheelRef,
}: {
  rearWheelRef?: Ref<SVGGElement>;
  frontWheelRef?: Ref<SVGGElement>;
}) {
  return (
    <g>
      <ellipse cx="2" cy="1" rx="84" ry="5" fill="black" opacity="0.35" />
      {/* rear wing */}
      <rect x="-86" y="-50" width="7" height="34" rx="1.5" fill="#18181b" />
      <rect x="-90" y="-52" width="28" height="6" rx="2" style={{ fill: "rgb(var(--accent))" }} />
      <rect x="-88" y="-44" width="22" height="3.5" rx="1.5" fill="#18181b" />
      <rect x="-74" y="-46" width="4" height="22" fill="#27272a" />
      {/* floor */}
      <rect x="-72" y="-11" width="152" height="4" rx="1" fill="#111" />
      {/* engine cover and airbox */}
      <path d="M -44 -30 Q -26 -46 -6 -49 L 4 -48 L 8 -34 Z" fill="#4c1d95" />
      {/* main body */}
      <path
        d="M -80 -14 L -80 -27 Q -62 -31 -42 -32 L -10 -34 Q 6 -42 20 -35 L 44 -27 L 72 -20 Q 84 -16 88 -12 L 88 -9 L -80 -9 Z"
        style={{ fill: "rgb(var(--accent))" }}
      />
      {/* livery */}
      <path d="M -80 -19 L -20 -22 L 30 -24 L 86 -13 L 86 -11 L 30 -19 L -20 -16 L -80 -14 Z" fill="white" opacity="0.9" />
      <path d="M -38 -29 L -8 -30 L -14 -22 L -40 -21 Z" fill="#c4b5fd" opacity="0.6" />
      <text x="-30" y="-23.5" fontSize="8" fontWeight="700" fill="#1e1b4b" fontFamily="ui-monospace, monospace">
        07
      </text>
      {/* cockpit, driver and halo */}
      <circle cx="9" cy="-39" r="7.5" fill="#fafafa" />
      <rect x="10" y="-42" width="7" height="3.5" rx="1.5" fill="#1e1b4b" />
      <path d="M -4 -40 Q 14 -53 32 -36" stroke="#18181b" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* front wing */}
      <rect x="62" y="-10" width="30" height="3.5" rx="1.5" fill="#18181b" />
      <rect x="88" y="-17" width="3.5" height="10" rx="1" style={{ fill: "rgb(var(--accent))" }} />
      {/* rain light */}
      <rect x="-90" y="-26" width="3" height="5" rx="1" fill="#ef4444">
        <animate attributeName="opacity" values="1;0.25;1" dur="0.9s" repeatCount="indefinite" />
      </rect>
      <Wheel cx={-52} cy={-16} r={16} wheelRef={rearWheelRef} />
      <Wheel cx={56} cy={-15} r={15} wheelRef={frontWheelRef} />
    </g>
  );
}

function Wheel({ cx, cy, r, wheelRef }: { cx: number; cy: number; r: number; wheelRef?: Ref<SVGGElement> }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill="#111" />
      <circle r={r - 3.5} fill="none" stroke="#facc15" strokeWidth="1.4" />
      <circle r={r - 6} fill="#27272a" />
      <g ref={wheelRef}>
        {[0, 72, 144, 216, 288].map((a) => (
          <rect key={a} x={-1} y={-(r - 6)} width={2} height={r - 6} fill="#71717a" transform={`rotate(${a})`} />
        ))}
      </g>
      <circle r={2.5} fill="#d4d4d8" />
    </g>
  );
}

/**
 * Top-down F1 car pointing +y (down the page), centred on the origin.
 * Drawn in a 40 × 92 box: rear wing at the top, nose and front wing at the bottom.
 */
export function TopF1() {
  const accent = { fill: "rgb(var(--accent))" };
  return (
    <g>
      <ellipse cx="1.5" cy="3" rx="16" ry="42" fill="black" opacity="0.28" />
      {/* suspension arms */}
      <path d="M -6 -26 L -14 -24 M 6 -26 L 14 -24 M -5 20 L -13 22 M 5 20 L 13 22" stroke="#27272a" strokeWidth="1.6" />
      {/* tyres, with a soft-compound stripe */}
      {[
        [-19, -33],
        [10, -33],
        [-18, 14],
        [10, 14],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <rect x={x} y={y} width={9} height={17} rx={3} fill="#111" />
          <rect x={x + 3.5} y={y + 1} width={2} height={15} rx={1} fill="#ef4444" opacity="0.85" />
        </g>
      ))}
      {/* rear wing */}
      <rect x="-15" y="-45" width="30" height="7" rx="2" style={accent} />
      <rect x="-16" y="-46" width="3" height="10" rx="1" fill="#18181b" />
      <rect x="13" y="-46" width="3" height="10" rx="1" fill="#18181b" />
      {/* body: engine cover, sidepods, cockpit, nose */}
      <path
        d="M -5 -40 L 5 -40 L 7 -28 L 12 -19 L 12 -3 L 7 5 L 5 12 L 2.4 36 L -2.4 36 L -5 12 L -7 5 L -12 -3 L -12 -19 L -7 -28 Z"
        style={accent}
      />
      <path d="M -12 -17 L -8 -17 L -8 -5 L -12 -5 Z M 12 -17 L 8 -17 L 8 -5 L 12 -5 Z" fill="#4c1d95" />
      <rect x="-1.4" y="-39" width="2.8" height="74" fill="white" opacity="0.85" />
      {/* cockpit, helmet and halo */}
      <ellipse cx="0" cy="1" rx="4.6" ry="7.5" fill="#18181b" />
      <circle cx="0" cy="2" r="3.4" fill="#facc15" />
      <rect x="-2.4" y="3" width="4.8" height="1.6" rx="0.8" fill="#1e1b4b" />
      <path d="M -5 -4 Q 0 12 5 -4" stroke="#3f3f46" strokeWidth="1.5" fill="none" />
      {/* front wing */}
      <path d="M -17 36 L 17 36 L 15 42 L -15 42 Z" fill="#18181b" />
      <rect x="-18" y="34" width="3" height="9" rx="1" style={accent} />
      <rect x="15" y="34" width="3" height="9" rx="1" style={accent} />
    </g>
  );
}
