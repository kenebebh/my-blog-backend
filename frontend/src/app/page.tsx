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
