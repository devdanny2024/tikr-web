import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { MapPin, FileText, Package, Camera, Brain, Wifi } from "lucide-react";

const FEATURES = [
  {
    icon: <MapPin size={36} color="#F59E0B" />,
    name: "GPS Attendance",
    desc: "Verify workers are actually on-site with GPS check-in and facial verification. End ghost workers permanently.",
  },
  {
    icon: <FileText size={36} color="#F59E0B" />,
    name: "Daily Site Reports",
    desc: "Supervisors submit structured reports from the field. Data syncs instantly to your management dashboard.",
  },
  {
    icon: <Package size={36} color="#F59E0B" />,
    name: "Material Tracking",
    desc: "Log every delivery. Track usage in real time. Detect shortages and theft before they become crises.",
  },
  {
    icon: <Camera size={36} color="#F59E0B" />,
    name: "Geo-Tagged Photos",
    desc: "Every site photo is stamped with GPS coordinates, timestamp, and user identity. Immutable evidence.",
  },
  {
    icon: <Brain size={36} color="#F59E0B" />,
    name: "AI Delay Prediction",
    desc: "Our AI analyzes 15+ project signals to predict delays before they occur. Act early — not after.",
  },
  {
    icon: <Wifi size={36} color="#F59E0B" />,
    name: "Offline Mode",
    desc: "Works without internet. All data is cached locally and syncs automatically when connection returns.",
  },
];

export function SolutionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="features"
      style={{
        background: "#1C1C1E",
        padding: "clamp(60px, 10vw, 120px) clamp(20px, 4vw, 40px)",
      }}
    >
      {/* Center intro */}
      <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ color: "#F59E0B", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 16 }}
        >
          The Solution
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          One platform. Every site. Total control.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ color: "#8E8E93", fontSize: 18, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}
        >
          Buildafr connects field teams, site managers, procurement officers, and clients in real time — from any device, even offline.
        </motion.p>
      </div>

      {/* Feature cards grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
        className="features-grid"
      >
        {FEATURES.map((feat, i) => (
          <motion.div
            key={feat.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            style={{
              background: "#2C2C2E",
              borderRadius: 16,
              padding: 40,
              border: "1px solid #3A3A3C",
              cursor: "default",
              transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.4)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(245,158,11,0.08)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#3A3A3C";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div style={{ marginBottom: 20 }}>{feat.icon}</div>
            <div style={{ color: "white", fontSize: 20, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>{feat.name}</div>
            <div style={{ color: "#8E8E93", fontSize: 15, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>{feat.desc}</div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
