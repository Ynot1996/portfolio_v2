import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  FiArrowLeft,
  FiArrowRight,
  FiGithub,
  FiExternalLink,
  FiAward,
} from "react-icons/fi";
import { projects, getProject } from "../../data";
import ArchitectureDiagram from "../../components/ArchitectureDiagram";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Tony Kang`,
    description: project.oneLiner,
  };
}

const storyOrder = [
  { key: "background", label: "Background" },
  { key: "challenge", label: "The challenge" },
  { key: "approach", label: "Approach" },
  { key: "outcome", label: "Outcome" },
] as const;

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const hasRepo = Boolean(project.repo);

  return (
    <main>
      {/* header */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-black/40" />
        </div>

        <div className="relative mx-auto max-w-content px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-white/80 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FiArrowLeft className="h-4 w-4" aria-hidden /> All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
              {project.category}
            </span>
            {project.award && (
              <span className="inline-flex items-center gap-1 rounded-full bg-up px-3 py-1 text-[11px] font-semibold text-black">
                <FiAward className="h-3.5 w-3.5" aria-hidden /> {project.award}
              </span>
            )}
          </div>

          <h1 className="display-fluid-sm mt-4 max-w-3xl font-serif font-light text-white">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {project.oneLiner}
          </p>
        </div>
      </section>

      {/* body */}
      <section className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* meta sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <dl className="grid gap-5 rounded-2xl border border-line bg-panel p-6">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-muted">Timeline</dt>
                <dd className="mt-1 text-sm font-medium text-ink">{project.period}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-muted">Role</dt>
                <dd className="mt-1 text-sm font-medium text-ink">{project.role}</dd>
              </div>
              {project.metric && (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wide text-muted">Highlight</dt>
                  <dd className="mt-1 text-sm font-medium text-accent">{project.metric}</dd>
                </div>
              )}
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-muted">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-panel2 px-2.5 py-1 font-mono text-[10px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-col gap-2">
              {hasRepo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-bg outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <FiGithub className="h-4 w-4" aria-hidden /> View source
                </a>
              ) : (
                <span className="rounded-xl border border-dashed border-line px-4 py-3 text-center text-xs text-muted">
                  Repository link coming soon
                </span>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-panel px-4 py-3 text-sm font-medium text-ink outline-none transition-colors hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <FiExternalLink className="h-4 w-4" aria-hidden /> Live demo
                </a>
              )}
            </div>
          </aside>

          {/* story */}
          <div className="max-w-2xl">
            <ol className="grid gap-10">
              {storyOrder.map((s, i) => (
                <li key={s.key}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-accent">0{i + 1}</span>
                    <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                      {s.label}
                    </h2>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink/80">{project.story[s.key]}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* architecture */}
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              System architecture
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <ArchitectureDiagram architecture={project.architecture} />
        </div>

        {/* prev / next */}
        <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex flex-col rounded-2xl border border-line bg-panel p-5 outline-none transition-colors hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-muted">
              <FiArrowLeft className="h-3.5 w-3.5" aria-hidden /> Previous
            </span>
            <span className="mt-1 font-display text-base font-semibold text-ink group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col rounded-2xl border border-line bg-panel p-5 text-right outline-none transition-colors hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent sm:items-end"
          >
            <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-muted">
              Next <FiArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="mt-1 font-display text-base font-semibold text-ink group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </nav>
      </section>
    </main>
  );
}
