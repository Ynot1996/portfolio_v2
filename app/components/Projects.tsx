"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, categories, type Category } from "../data";
import ProjectCard from "./ProjectCard";

type Filter = "All" | Category;
const filters: Filter[] = ["All", ...categories];

export default function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            02 — Selected work
          </span>
          <h2 className="mt-3 font-serif text-3xl font-light tracking-tight sm:text-5xl">
            Projects, by type
          </h2>
          <p className="mt-4 text-muted">
            From AI/ML and fintech to full-stack systems and coursework — every project
            opens into a full case study with the story and architecture behind it.
          </p>
        </header>

        {/* filter tabs */}
        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => {
            const count =
              f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
            const isActive = active === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent",
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-line bg-panel text-muted hover:border-accent/40 hover:text-ink",
                ].join(" ")}
              >
                {f}
                <span className={isActive ? "ml-1.5 text-white/70" : "ml-1.5 text-muted/60"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* grid */}
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
