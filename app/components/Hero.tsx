"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { profile, stats, type Stat } from "../data";

/* ------------------------------- Count up -------------------------------- */

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.value, active);
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <div className="font-mono text-2xl font-semibold tabular-nums text-ink">
        {stat.prefix}
        {value}
        {stat.suffix}
      </div>
      <div className="mt-1 text-xs text-muted">{stat.label}</div>
    </div>
  );
}

/* ----------------------------- Equity curve ------------------------------ */

function EquityCurve() {
  const line = "M0,168 L44,156 L88,162 L132,128 L176,140 L220,104 L264,116 L308,72 L352,86 L400,40";
  const area = `${line} L400,200 L0,200 Z`;

  return (
    <svg
      viewBox="0 0 400 200"
      className="h-full w-full"
      role="img"
      aria-label="Stylized upward-trending performance chart"
    >
      <defs>
        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1652F0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1652F0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* gridlines */}
      {[40, 80, 120, 160].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="400"
          y2={y}
          stroke="#E8E8EE"
          strokeWidth="1"
        />
      ))}

      <motion.path
        d={area}
        fill="url(#fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#1652F0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.circle
        cx="400"
        cy="40"
        r="5"
        fill="#1652F0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 300 }}
      />
      <motion.circle
        cx="400"
        cy="40"
        r="5"
        fill="none"
        stroke="#1652F0"
        animate={{ r: [5, 14], opacity: [0.6, 0] }}
        transition={{ delay: 1.6, duration: 1.6, repeat: Infinity }}
      />
    </svg>
  );
}

/* --------------------------------- Hero ---------------------------------- */

const socials = [
  { label: "GitHub", href: profile.github, Icon: FiGithub },
  { label: "LinkedIn", href: profile.linkedin, Icon: FiLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, Icon: FiMail },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-grid pt-28 pb-16 sm:pt-36"
    >
      {/* soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.95fr]">
        {/* left: intro */}
        <div ref={ref}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 font-mono text-xs text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-up" />
            Open to software engineering, AI and product collaborations · {profile.location}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          >
            {profile.name}
            <span className="block text-accent">{profile.role}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent"
            >
              View work
            </a>
            <div className="flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-muted outline-none transition-colors hover:border-accent/40 hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </div>
          </motion.div>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} active={inView} />
            ))}
          </div>
        </div>

        {/* right: design composition panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-6 shadow-soft"
        >
          <span className="absolute -top-8 left-6 inline-flex rounded-full bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
            Brand direction
          </span>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-line bg-panel p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">
                Visual concept
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                Refined geometry, warm colour and motion that feels custom.
              </h3>
            </div>
            <div className="relative h-56 overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-accent/10 via-white to-up/10">
              <div className="absolute left-6 top-8 h-20 w-20 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute right-8 top-20 h-24 w-24 rounded-full bg-up/20 blur-3xl" />
              <div className="absolute left-10 bottom-12 h-32 w-32 rounded-full border border-accent/20 bg-white/60 backdrop-blur-xl" />
              <div className="absolute right-10 bottom-10 h-16 w-16 rounded-3xl bg-white/70 shadow-soft" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
              <div className="absolute left-7 top-12 flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-mono uppercase tracking-[0.24em] text-muted shadow-soft">
                <span className="block h-2.5 w-2.5 rounded-full bg-accent" />
                Interaction prototype
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-14 flex justify-center">
        <a
          href="#stack"
          aria-label="Scroll to tech stack"
          className="inline-flex flex-col items-center gap-1 text-xs text-muted outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="font-mono">scroll</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <FiArrowDown className="h-4 w-4" aria-hidden />
          </motion.span>
        </a>
      </div>
    </section>
  );
}
