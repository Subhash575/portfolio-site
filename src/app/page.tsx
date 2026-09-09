import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ExperienceSection from "@/sections/ExperienceSection";
import GithubActivitySection from "@/sections/GithubActivitySection";
import ProjectsSection from "@/sections/ProjectsSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-6 sm:px-12 md:px-16 lg:px-24">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <GithubActivitySection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
