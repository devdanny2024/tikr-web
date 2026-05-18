import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";

const TESTIMONIALS = [
  {
    quote: "We stopped losing 15% of our site materials every month after deploying Tikr. The material tracking alone paid for the subscription in the first week.",
    name: "Chidi Okafor",
    title: "Project Director",
    company: "Lagos Build Co.",
    city: "Lagos",
    initials: "CO",
    color: "#F59E0B",
  },
  {
    quote: "Our clients used to call us every day asking for updates. Now they log into the portal themselves. The trust it built has won us three new contracts.",
    name: "Amara Nwosu",
    title: "Construction Manager",
    company: "BuildRight Africa",
    city: "Nairobi",
    initials: "AN",
    color: "#3B82F6",
  },
  {
    quote: "The AI alert caught a delay risk on our Block C project two weeks before it became a real problem. That saved us over $40,000 in penalties.",
    name: "Kwame Asante",
    title: "Site Engineer",
    company: "Accra Developers Ltd.",
    city: "Accra",
    initials: "KA",
    color: "#22C55E",
  },
];

const LOGOS = ["LagosBuild", "AccraDev", "NairobiRC", "AbujaPM", "StellarEng", "DeltaConst"];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="case-studies"
      style={{ background: "#FFFFFF", padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 64 }}
      >
        <h2 style={{ color: "#0A0A0A", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
          Trusted by builders across Africa
        </h2>
        <p style={{ color: "#636366", fontSize: 18, fontFamily: "'Inter', sans-serif" }}>
          Real results from real construction teams.
        </p>
      </motion.div>

      <div
        style={{ maxWidth: 1200, margin: "0 auto 64px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
        className="testimonials-grid"
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              padding: 40,
              boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
              border: "1px solid #F0F0F0",
              transition: "box-shadow 0.2s, transform 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 64px rgba(0,0,0,0.12)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 32px rgba(0,0,0,0.08)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            {/* Quote mark */}
            <div style={{ color: "#F59E0B", fontSize: 60, fontFamily: "'Inter', sans-serif", fontWeight: 900, lineHeight: 0.8, marginBottom: 24, userSelect: "none" }}>"</div>

            {/* Stars */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ color: "#F59E0B", fontSize: 16 }}>★</span>
              ))}
            </div>

            {/* Quote */}
            <p style={{ color: "#0A0A0A", fontSize: 17, fontFamily: "'Inter', sans-serif", fontStyle: "italic", lineHeight: 1.6, marginBottom: 28 }}>
              {t.quote}
            </p>

            {/* Attribution */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: `${t.color}20`,
                  border: `1.5px solid ${t.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: t.color,
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  flexShrink: 0,
                }}
              >
                {t.initials}
              </div>
              <div>
                <div style={{ color: "#0A0A0A", fontSize: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{t.name}</div>
                <div style={{ color: "#636366", fontSize: 12, fontFamily: "'Inter', sans-serif" }}>{t.title} · {t.company}, {t.city}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logo strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}
      >
        {LOGOS.map((logo) => (
          <div
            key={logo}
            style={{ color: "#C7C7CC", fontSize: 13, fontWeight: 700, fontFamily: "'Inter', sans-serif", letterSpacing: 1, textTransform: "uppercase" }}
          >
            {logo}
          </div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          .testimonials-grid { grid-template-columns: 1fr !important; max-width: 540px; margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
