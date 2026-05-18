import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { SolutionSection } from "./SolutionSection";
import { ShowcaseSection } from "./ShowcaseSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { RolesSection } from "./RolesSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { PricingSection } from "./PricingSection";
import { CTABannerSection } from "./CTABannerSection";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ShowcaseSection />
      <HowItWorksSection />
      <RolesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTABannerSection />
      <Footer />

      {/* Mobile sticky bottom CTA */}
      <div className="mobile-cta-bar">
        <button
          onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            display: "block",
            width: "100%",
            background: "#F59E0B",
            color: "#0A0A0A",
            textAlign: "center",
            padding: "16px 0",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            border: "none",
            cursor: "pointer",
          }}
        >
          Join the Waitlist →
        </button>
      </div>

      <style>{`
        .mobile-cta-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 500;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.15);
        }
        @media (max-width: 390px) {
          .mobile-cta-bar { display: block !important; }
        }
      `}</style>
    </div>
  );
}
