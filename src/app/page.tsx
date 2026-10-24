import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import WorkSection from "@/sections/WorkSection";
import CareerSection from "@/sections/CareerSection";
import ContactSection from "@/sections/ContactSection";
import MainCable from "@/components/MainCable";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <CareerSection />
      <ContactSection />
      <MainCable />
    </main>
  );
}
