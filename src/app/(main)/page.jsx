import HeroSectionTwo from "@/components/homepage/hero-section-two";
import HeroSectionOne from "@/components/homepage/hero-section-one";
import HeroSectionThree from "@/components/homepage/hero-section-three";
import HeroSectionFour from "@/components/homepage/hero-section-four";

export default function Home() {
  return (
    <main className="min-h-screen py-16">
      <HeroSectionOne />
      <HeroSectionTwo />
      <HeroSectionFour />
      <HeroSectionThree />
    </main>
  );
}
