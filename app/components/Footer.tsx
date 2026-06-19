import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-2 px-5 text-xs text-muted sm:flex-row sm:px-8">
        <span className="font-mono">
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="font-mono">Built with Next.js · TypeScript · Framer Motion</span>
      </div>
    </footer>
  );
}
