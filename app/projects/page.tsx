import type { Metadata } from "next";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Projects — Tony Kang",
  description:
    "Full-stack, AI/ML, fintech and coursework projects by Tony Kang, each with a full case study and system architecture.",
};

export default function ProjectsIndex() {
  return (
    <main className="pt-16">
      <Projects />
      <Footer />
    </main>
  );
}
