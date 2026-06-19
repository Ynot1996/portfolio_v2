import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import { profile } from "./data";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <Projects />
      <Timeline />

      {/* Contact CTA */}
      <section id="contact" className="border-t border-line bg-grid py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            04 — Contact
          </span>
          <h2 className="mt-3 font-serif text-3xl font-light tracking-tight sm:text-5xl">
            Let&apos;s build something precise.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Open to graduate and junior software engineering roles in the UK, plus AI and
            fintech collaborations. The fastest way to reach me is email.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-medium text-bg outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FiMail className="h-4 w-4" aria-hidden />
              {profile.email}
            </a>
            <div className="flex gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-panel text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FiGithub className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-panel text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FiLinkedin className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
