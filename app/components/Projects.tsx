"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { projects, categories, type Category } from "../data";
import ProjectCard from "./ProjectCard";

type Filter = "All" | Category;
const filters: Filter[] = ["All", ...categories];

// Estimated card row height and surrounding chrome, used to work out how many
// project cards fit on a single screen before we paginate.
const ROW_HEIGHT = 372;
const CHROME = 240;

export default function Projects() {
  const [active, setActive] = useState<Filter>("All");
  const [page, setPage] = useState(0);

  // Page size adapts to the viewport so a page always fits one screen.
  const [pageSize, setPageSize] = useState(6);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const cols = w >= 1024 ? 3 : w >= 640 ? 2 : 1;
      const rows = Math.max(1, Math.floor((window.innerHeight - CHROME) / ROW_HEIGHT));
      setPageSize(cols * rows);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const visible = filtered.slice(current * pageSize, current * pageSize + pageSize);

  const selectFilter = (f: Filter) => {
    setActive(f);
    setPage(0);
  };

  return (
    <section
      id="work"
      className="snap-section flex min-h-screen flex-col justify-center border-t border-line py-24"
    >
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              02 — Selected work
            </span>
            <h2 className="mt-2 font-serif text-3xl font-light tracking-tight sm:text-4xl">
              Projects, by type
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">
            Every project opens into a full case study with the story and architecture behind it.
          </p>
        </header>

        {/* filter tabs */}
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => {
            const count =
              f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
            const isActive = active === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => selectFilter(f)}
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
        <motion.div layout className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* pagination */}
        {pageCount > 1 && (
          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              aria-label="Previous page"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-panel text-muted outline-none transition-colors hover:border-accent/40 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FiChevronLeft className="h-4 w-4" aria-hidden />
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={i === current}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    i === current ? "w-6 bg-accent" : "w-2.5 bg-line hover:bg-muted",
                  ].join(" ")}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={current === pageCount - 1}
              aria-label="Next page"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-panel text-muted outline-none transition-colors hover:border-accent/40 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FiChevronRight className="h-4 w-4" aria-hidden />
            </button>

            <span className="ml-1 font-mono text-xs text-muted">
              {current + 1} / {pageCount}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
