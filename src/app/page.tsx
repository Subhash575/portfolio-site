import HeroSection from "@/sections/HeroSection";
import TechMarquee from "@/sections/TechMarquee";
import AboutSection from "@/sections/AboutSection";
import ProjectsSection from "@/sections/ProjectsSection";
import ExperienceSection from "@/sections/ExperienceSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TechMarquee />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
