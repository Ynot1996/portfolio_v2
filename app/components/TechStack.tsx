"use client";

import { motion } from "framer-motion";
import { techGroups, type Tech } from "../data";

function TechItem({ tech }: { tech: Tech }) {
  const { icon: Icon, name, color } = tech;
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
      className="group flex items-center gap-3 rounded-xl border border-line bg-panel px-3.5 py-2.5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft"
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-panel2 transition-colors"
        style={color ? ({ ["--c" as string]: color } as React.CSSProperties) : undefined}
      >
        {Icon ? (
          <Icon
            className="h-5 w-5 text-[color:var(--c)]"
            aria-hidden
          />
        ) : (
          <span className="font-mono text-xs font-semibold text-accent">
            {name.slice(0, 2)}
          </span>
        )}
      </span>
      <span className="text-sm font-medium text-ink">{name}</span>
    </motion.li>
  );
}

export default function TechStack() {
  return (
    <section
      id="stack"
      className="snap-section flex min-h-screen flex-col justify-center border-t border-line bg-panel2/40 py-24"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            01 — Toolkit
          </span>
          <h2 className="mt-2 font-serif text-3xl font-light tracking-tight sm:text-4xl">
            The stack I build with
          </h2>
          <p className="mt-3 text-sm text-muted">
            Python-first across full-stack, AI/ML and fintech — with C# / .NET, cloud
            tooling and a habit of designing systems before writing code.
          </p>
        </header>

        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {techGroups.map((group) => (
            <motion.div
              key={group.category}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                <span className="h-px w-6 bg-line" />
                {group.category}
              </h3>
              <ul className="grid gap-2">
                {group.items.map((t) => (
                  <TechItem key={t.name} tech={t} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
