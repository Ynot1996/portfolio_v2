"use client";

import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiAward } from "react-icons/fi";
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
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel outline-none transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-accent"
      >
        {/* image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
            {project.category}
          </span>
          {project.award && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-up/90 px-3 py-1 text-[11px] font-semibold text-black">
              <FiAward className="h-3.5 w-3.5" aria-hidden />
              1st
            </span>
          )}
          <h3 className="absolute inset-x-4 bottom-3 font-display text-xl font-semibold tracking-tight text-white">
            {project.title}
          </h3>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-4">
          {project.metric && (
            <div className="font-mono text-xs font-medium text-accent">{project.metric}</div>
          )}
          <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
            {project.oneLiner}
          </p>

          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((t) => (
              <li
                key={t}
                className="rounded-full bg-panel2 px-2.5 py-1 font-mono text-[10px] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
              {project.period}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors group-hover:text-accent">
              Case study <FiArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
    );
  }
);

export default ProjectCard;
