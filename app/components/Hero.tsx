"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { profile, stats, type Stat } from "../data";

/* count-up for stat chips */
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

function StatChip({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.value, active);
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
      <div className="font-mono text-2xl font-semibold tabular-nums text-white">
        {stat.prefix}
        {value}
        {stat.suffix}
      </div>
      <div className="mt-1 text-xs text-white/60">{stat.label}</div>
    </div>
  );
}

const socials = [
  { label: "GitHub", href: profile.github, Icon: FiGithub },
  { label: "LinkedIn", href: profile.linkedin, Icon: FiLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, Icon: FiMail },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const realInView = useInView(ref, { once: true, margin: "-80px" });
  // Hero is above the fold — guarantee it reveals on mount even if the
  // in-view observer hasn't fired yet, so content can never stay hidden.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const inView = realInView || mounted;

  return (
    <section id="top" className="snap-section relative overflow-hidden">
      {/* photo background — treated as a dark band in both themes */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-london-dusk.jpg"
          alt="London skyline at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* legibility + brand overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        {/* thin blend into the page only at the very bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />
        <div
          aria-hidden
          className="glow-accent pointer-events-none absolute -right-20 top-10 h-[460px] w-[460px] rounded-full opacity-70"
        />
      </div>

      <div
        ref={ref}
        className="relative mx-auto flex min-h-screen max-w-content flex-col justify-center px-5 pb-20 pt-28 sm:px-8 sm:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-up" />
          {profile.location} · {profile.status}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="display-fluid mt-6 max-w-4xl font-serif font-light text-white"
        >
          {profile.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          <span className="font-medium text-white">{profile.name}</span> — {profile.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href="#work"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent"
          >
            View work
          </Link>
          <div className="flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/25 bg-white/5 text-white/80 outline-none backdrop-blur-sm transition-colors hover:border-white/60 hover:text-white focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Icon className="h-5 w-5" aria-hidden />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <StatChip key={s.label} stat={s} active={inView} />
          ))}
        </motion.div>

        <a
          href="#stack"
          aria-label="Scroll to content"
          className="mt-12 inline-flex w-fit flex-col items-center gap-1 text-xs text-white/60 outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="font-mono uppercase tracking-[0.2em]">scroll</span>
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <FiArrowDown className="h-4 w-4" aria-hidden />
          </motion.span>
        </a>
      </div>
    </section>
  );
}
