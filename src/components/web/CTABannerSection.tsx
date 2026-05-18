import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { EmailSignup } from "./EmailSignup";

export function CTABannerSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{ background: "#F59E0B", padding: "clamp(60px, 8vw, 80px) clamp(20px, 4vw, 40px)", textAlign: "center" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2
          style={{
            color: "#0A0A0A",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Your next project starts on time.
        </h2>
        <p
          style={{
            color: "#0A0A0A",
            fontSize: 20,
            fontFamily: "'Inter', sans-serif",
            opacity: 0.75,
            marginBottom: 40,
          }}
        >
          Join the waitlist — we're onboarding construction firms across Africa.
        </p>

        <div style={{ maxWidth: 520, margin: "0 auto 16px" }}>
          <EmailSignup
            dark={false}
            size="lg"
            placeholder="Enter your work email"
            buttonLabel="Join the Waitlist →"
            successMessage="You're on the list! We'll reach out soon."
          />
        </div>

        <div style={{ color: "#0A0A0A", fontSize: 14, fontFamily: "'Inter', sans-serif", opacity: 0.55 }}>
          No credit card required · Be first to get access
        </div>
      </motion.div>
    </section>
  );
}
