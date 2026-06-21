"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { profile } from "../data";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Journey", href: "/#journey" },
  { label: "Stack", href: "/#stack" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/85 shadow-soft"
          : "border-b border-line/60 bg-bg/55",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-mono text-sm font-semibold text-white">
            T
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            {profile.shortName}
          </span>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-bg outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent"
          >
            Contact
          </Link>
          <ThemeToggle className="ml-2" />
        </div>

        {/* mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-panel text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md sm:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink outline-none transition-colors hover:bg-panel focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl bg-ink px-4 py-3 text-center text-base font-medium text-bg"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
