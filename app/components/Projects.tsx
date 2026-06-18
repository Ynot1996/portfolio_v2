"use client";

import { motion } from "framer-motion";
import { FiGithub, FiArrowUpRight, FiAward } from "react-icons/fi";
import { projects, categories, type Category, type Project } from "../data";

const categoryStyles: Record<Category, string> = {
  "AI & Data": "text-accent bg-accent/10",
  Software: "text-up bg-up/10",
  Collaboration: "text-purple-600 bg-purple-600/10",
  Portfolio: "text-amber-600 bg-amber-600/10",
};

const categoryDescriptions: Record<Category, string> = {
  "AI & Data": "Models, experiments and visual data stories for product exploration.",
  Software: "Full-stack systems, interfaces and experience-driven builds.",
  Collaboration: "Team-led projects that combine design, product and engineering.",
  Portfolio: "Personal work that shows craft, storytelling and polished execution.",
};

function ProjectCard({
  project,
  flip,
}: {
  project: Project;
  flip: boolean;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`group relative flex flex-col rounded-[1.75rem] border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift ${
        flip ? "md:-translate-x-4" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${categoryStyles[project.category]}`}
        >
          {project.category}
        </span>
        {project.award && (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-amber-600">
            <FiAward className="h-3.5 w-3.5" aria-hidden />
            {project.award}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">
        {project.title}
      </h3>

      {project.metric && (
        <div className="mt-2 font-mono text-sm font-medium text-accent">
          {project.metric}
        </div>
      )}

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {project.blurb}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li
            key={t}
            className="rounded-full bg-panel px-3 py-1 text-[11px] font-mono text-muted"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <a
          href={project.href}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
        >
          Live <FiArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
        <a
          href={project.repo}
          aria-label={`${project.title} source on GitHub`}
          className="inline-flex items-center gap-1 text-sm text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FiGithub className="h-4 w-4" aria-hidden /> Code
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            02 — Selected work
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects, by type
          </h2>
          <p className="mt-3 text-muted">
            Every project appears in its type group, so you can see the full story at once.
          </p>
        </header>

        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          {categories.map((category) => {
            const items = projects.filter((project) => project.category === category);
            return (
              <div key={category} className="rounded-[2rem] border border-line bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-accent">
                      {category}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                      {items.length} projects
                    </h3>
                  </div>
                  <span className="rounded-full border border-line bg-panel px-3 py-1 text-xs font-medium text-muted">
                    {items.length}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {categoryDescriptions[category]}
                </p>

                <div className="mt-8 grid gap-5">
                  {items.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      flip={items.length > 2 && index % 2 === 1}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
