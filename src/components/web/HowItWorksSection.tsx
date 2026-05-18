import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Building2, Smartphone, LayoutDashboard } from "lucide-react";

const STEPS = [
  {
    number: "1",
    icon: <Building2 size={36} color="#F59E0B" />,
    title: "Set Up Your Projects",
    body: "Add your construction sites, invite your team members, and assign roles in minutes.",
  },
  {
    number: "2",
    icon: <Smartphone size={36} color="#F59E0B" />,
    title: "Deploy to the Field",
    body: "Your team downloads the Tikr app. GPS check-ins, reports, and photos go live immediately.",
  },
  {
    number: "3",
    icon: <LayoutDashboard size={36} color="#F59E0B" />,
    title: "Monitor Everything",
    body: "You and your clients see real-time progress from anywhere — desktop or mobile.",
  },
];

export function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="how-it-works"
      style={{ background: "#F5F5F7", padding: "100px 40px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 72 }}
      >
        <h2 style={{ color: "#0A0A0A", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
          Up and running in 48 hours
        </h2>
        <p style={{ color: "#636366", fontSize: 18, fontFamily: "'Inter', sans-serif" }}>
          No long implementation. No consultants required.
        </p>
      </motion.div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* Dashed connecting line — desktop only */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: "calc(16.66% + 20px)",
            right: "calc(16.66% + 20px)",
            height: 2,
            borderTop: "2px dashed #F59E0B",
            opacity: 0.4,
            pointerEvents: "none",
          }}
          className="step-line"
        />

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="steps-grid"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                padding: "32px 28px 28px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                position: "relative",
                border: "1px solid rgba(0,0,0,0.05)",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 48px rgba(0,0,0,0.1)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Step badge */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#F59E0B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0A0A0A",
                  fontSize: 18,
                  fontWeight: 800,
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: 24,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {step.number}
              </div>
              {/* Icon */}
              <div style={{ marginBottom: 16 }}>{step.icon}</div>
              <div style={{ color: "#0A0A0A", fontSize: 20, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
                {step.title}
              </div>
              <div style={{ color: "#636366", fontSize: 15, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
                {step.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .step-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}
