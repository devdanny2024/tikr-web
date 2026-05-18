import { useState, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Check } from "lucide-react";

const STARTER_FEATURES = [
  "Up to 3 active projects",
  "Worker attendance tracking",
  "Daily site reports",
  "Mobile app (iOS & Android)",
  "Up to 5 team members",
  "Basic analytics",
];

const GROWTH_FEATURES = [
  "Unlimited active projects",
  "Full material tracking",
  "AI delay prediction",
  "Client visibility portal",
  "Unlimited team members",
  "Offline mode (full)",
  "WhatsApp + SMS + Email alerts",
  "Advanced reporting",
];

const ENTERPRISE_FEATURES = [
  "Everything in Growth",
  "White-label options",
  "Multi-site management",
  "Custom AI modules",
  "Executive dashboards",
  "Dedicated onboarding",
  "SLA guarantee",
  "API access",
];

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const monthlyPrice = (base: number) => base;
  const annualPrice = (base: number) => Math.round(base * 0.8);

  return (
    <section
      ref={ref}
      id="pricing"
      style={{ background: "#F5F5F7", padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 48 }}
      >
        <h2 style={{ color: "#0A0A0A", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
          Simple, transparent pricing
        </h2>
        <p style={{ color: "#636366", fontSize: 18, fontFamily: "'Inter', sans-serif" }}>
          No setup fees hidden in the fine print. Cancel anytime.
        </p>
      </motion.div>

      {/* Billing toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: "flex", justifyContent: "center", marginBottom: 56 }}
      >
        <div
          style={{
            background: "#E5E5EA",
            borderRadius: 100,
            padding: 4,
            display: "flex",
            gap: 0,
          }}
        >
          {(["monthly", "annual"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              style={{
                padding: "8px 20px",
                borderRadius: 100,
                border: "none",
                background: billing === b ? "#F59E0B" : "transparent",
                color: billing === b ? "#0A0A0A" : "#636366",
                fontSize: 14,
                fontWeight: billing === b ? 700 : 500,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {b === "monthly" ? "Monthly" : "Annual — Save 20%"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Pricing cards */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 40px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          alignItems: "center",
        }}
        className="pricing-grid"
      >
        {/* Starter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: 32,
            border: "1px solid #E5E5EA",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
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
          <div style={{ color: "#636366", fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>For small contractors</div>
          <div style={{ color: "#0A0A0A", fontSize: 28, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>Starter</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
            <span style={{ color: "#0A0A0A", fontSize: 40, fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>
              ${billing === "monthly" ? monthlyPrice(99) : annualPrice(99)}
            </span>
            <span style={{ color: "#636366", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>/month</span>
          </div>
          {billing === "annual" && (
            <div style={{ color: "#22C55E", fontSize: 12, fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>Save ${(monthlyPrice(99) - annualPrice(99)) * 12}/year</div>
          )}
          <div style={{ height: 1, background: "#F0F0F0", margin: "24px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            {STARTER_FEATURES.map((f) => (
              <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Check size={16} color="#636366" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: "#636366", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>{f}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "14px 0",
              borderRadius: 10,
              border: "1.5px solid #0A0A0A",
              color: "#0A0A0A",
              background: "transparent",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F5F5F7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Join the Waitlist →
          </button>
        </motion.div>

        {/* Growth — featured */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            background: "#0A0A0A",
            borderRadius: 20,
            padding: 32,
            border: "1px solid #2C2C2E",
            boxShadow: "0 20px 80px rgba(0,0,0,0.3)",
            position: "relative",
            transform: "scale(1.04)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.06)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 100px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 80px rgba(0,0,0,0.3)";
          }}
        >
          {/* Most popular badge */}
          <div
            style={{
              position: "absolute",
              top: -14,
              right: 24,
              background: "#F59E0B",
              color: "#0A0A0A",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              padding: "4px 14px",
              borderRadius: 100,
            }}
          >
            Most Popular
          </div>

          <div style={{ color: "#8E8E93", fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>For medium construction firms</div>
          <div style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>Growth</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
            <span style={{ color: "#FFFFFF", fontSize: 40, fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>
              ${billing === "monthly" ? monthlyPrice(299) : annualPrice(299)}
            </span>
            <span style={{ color: "#636366", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>/month</span>
          </div>
          {billing === "annual" && (
            <div style={{ color: "#22C55E", fontSize: 12, fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>Save ${(monthlyPrice(299) - annualPrice(299)) * 12}/year</div>
          )}
          <div style={{ height: 1, background: "#2C2C2E", margin: "24px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            {GROWTH_FEATURES.map((f) => (
              <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Check size={16} color="#F59E0B" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: "#E5E5EA", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>{f}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "14px 0",
              borderRadius: 10,
              background: "#F59E0B",
              color: "#0A0A0A",
              border: "none",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(245,158,11,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Join the Waitlist →
          </button>
        </motion.div>

        {/* Enterprise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: 32,
            border: "1px solid #E5E5EA",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
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
          <div style={{ color: "#636366", fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>For large developers & government</div>
          <div style={{ color: "#0A0A0A", fontSize: 28, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>Enterprise</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
            <span style={{ color: "#0A0A0A", fontSize: 40, fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>Custom</span>
          </div>
          <div style={{ color: "#636366", fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>Pricing tailored to your scale</div>
          <div style={{ height: 1, background: "#F0F0F0", margin: "24px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            {ENTERPRISE_FEATURES.map((f) => (
              <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Check size={16} color="#636366" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: "#636366", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>{f}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "14px 0",
              borderRadius: 10,
              border: "1.5px solid #0A0A0A",
              color: "#0A0A0A",
              background: "transparent",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F5F5F7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Contact Sales →
          </button>
        </motion.div>
      </div>

      {/* Note */}
      <div style={{ textAlign: "center", color: "#8E8E93", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
        All plans include a 14-day free trial · No credit card required
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px; margin-left: auto; margin-right: auto; }
          .pricing-grid > *:nth-child(2) { transform: scale(1) !important; }
        }
      `}</style>
    </section>
  );
}
