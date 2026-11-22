import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import ProjectMetrics from "./components/ProjectMetrics";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <Projects />
      <ProjectMetrics />
      <Timeline />
    </main>
  );
}
