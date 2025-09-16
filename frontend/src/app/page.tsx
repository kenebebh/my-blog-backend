// import { Navigation } from "@/components/navigation"
// import { HeroSection } from "@/components/sections/hero-section"
// import { FeaturesSection } from "@/components/sections/features-section"
// import { CommunitySection } from "@/components/sections/community-section"
// import { CTASection } from "@/components/sections/cta-section"
// import { Footer } from "@/components/footer"
import { Navigation, Footer } from "@/components/common";
import {
  HeroSection,
  FeaturesSection,
  CommunitySection,
  CTASection,
} from "@/components/landing-page";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CommunitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
