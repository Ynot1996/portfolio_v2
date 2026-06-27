"use client";

import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiAward, FiExternalLink, FiStar } from "react-icons/fi";
import type { Project } from "../data";

const ProjectCard = forwardRef<HTMLDivElement, { project: Project }>(
  function ProjectCard({ project }, ref) {
    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
      >
        <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
          {/* image — links to case study */}
          <Link
            href={`/projects/${project.slug}`}
            className="relative block aspect-[16/9] overflow-hidden bg-panel2 outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={[
                "transition-transform duration-500 group-hover:scale-105",
                project.imageFit === "contain"
                  ? "object-contain object-top"
                  : project.imageFit === "fill"
                    ? "object-fill"
                    : "object-cover",
              ].join(" ")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span
              className={[
                "absolute left-3 right-3 top-3 flex flex-nowrap gap-1.5",
                project.featured || project.award ? "pr-9" : "",
              ].join(" ")}
            >
              {project.categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-black/55 px-2 py-1 font-mono text-[10px] text-white backdrop-blur-sm"
                >
                  {c}
                </span>
              ))}
            </span>
            {project.award ? (
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-up/90 px-3 py-1 text-[11px] font-semibold text-black">
                <FiAward className="h-3.5 w-3.5" aria-hidden />
                1st
              </span>
            ) : project.featured ? (
              <span
                title="Recommended pick"
                aria-label="Recommended pick"
                className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-accent text-white shadow-soft"
              >
                <FiStar className="h-3.5 w-3.5 fill-current" aria-hidden />
              </span>
            ) : null}
            <h3 className="absolute inset-x-4 bottom-3 font-display text-xl font-semibold tracking-tight text-white">
              {project.title}
            </h3>
          </Link>

          {/* body */}
          <div className="flex flex-1 flex-col p-5">
            <p className="text-sm leading-relaxed text-muted line-clamp-3">
              {project.oneLiner}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2 pb-1">
              {project.tags.slice(0, 4).map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-panel2 px-2.5 py-1 font-mono text-[10px] text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
              <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                {project.period}
              </span>
              <div className="flex items-center gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Demo <FiExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  Case study <FiArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

export default ProjectCard;
