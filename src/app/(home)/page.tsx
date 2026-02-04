import { CTASection } from "./_components/landing-page/cta-section";
import { FeaturesSection } from "./_components/landing-page/features-section";
import { HeroSection } from "./_components/landing-page/hero-section";
import { ServicesPreview } from "./_components/landing-page/services-preview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ServicesPreview />
      <CTASection />
    </>
  );
}
