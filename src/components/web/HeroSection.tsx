import { motion } from "motion/react";
import { MapPin, Users, TriangleAlert, Package } from "lucide-react";
import { EmailSignup } from "./EmailSignup";

const HEADLINE_WORDS_1 = ["Stop", "Losing", "Projects."];
const HEADLINE_WORDS_2 = ["Start", "Delivering."];

const LOGOS = ["BuildCo", "Lekki Dev", "AccraBuilt", "NairobiRC", "AbujaPM", "StellarEng"];

function DashboardMockup() {
  return (
    <div
      style={{
        background: "#111111",
        borderRadius: 12,
        border: "1px solid #2C2C2E",
        overflow: "hidden",
        boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 80px rgba(245,158,11,0.12)",
        maxWidth: 900,
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Browser chrome */}
      <div style={{ background: "#1C1C1E", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #2C2C2E" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22C55E" }} />
        <div style={{ flex: 1, background: "#2C2C2E", borderRadius: 6, height: 26, display: "flex", alignItems: "center", paddingLeft: 12, marginLeft: 8 }}>
          <span style={{ color: "#636366", fontSize: 12, fontFamily: "'Inter', sans-serif" }}>app.tikr.build/dashboard</span>
        </div>
      </div>

      {/* Dashboard content */}
      <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="dash-outer-grid">
        {/* Stats row */}
        <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="dash-stats-grid">
          {[
            { label: "Active Sites", value: "12", color: "#F59E0B" },
            { label: "Workers Today", value: "247", color: "#22C55E" },
            { label: "Open Tasks", value: "58", color: "#3B82F6" },
            { label: "AI Alerts", value: "3", color: "#EF4444" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#1C1C1E", borderRadius: 10, padding: "14px 16px", border: "1px solid #2C2C2E" }}>
              <div style={{ color: stat.color, fontSize: 24, fontWeight: 800, fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ color: "#636366", fontSize: 11, fontFamily: "'Inter', sans-serif", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Africa Map Panel */}
        <div style={{ gridColumn: "1 / 3", background: "#1C1C1E", borderRadius: 10, padding: 16, border: "1px solid #2C2C2E", minHeight: 180, position: "relative", overflow: "hidden" }} className="dash-map-panel">
          <div style={{ color: "#8E8E93", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>Active Projects — Africa</div>
          {/* Simplified Africa shape using SVG */}
          <svg viewBox="0 0 200 220" style={{ position: "absolute", bottom: 0, right: 0, opacity: 0.15, width: 160 }}>
            <path d="M70 10 Q90 5 110 15 Q130 8 145 25 Q165 35 160 60 Q170 80 155 100 Q165 120 150 145 Q140 170 120 185 Q100 200 80 195 Q60 198 45 180 Q25 165 30 140 Q15 115 25 90 Q20 65 35 45 Q50 20 70 10Z" fill="white" />
          </svg>
          {/* Project pins */}
          {[
            { x: "52%", y: "38%", label: "Lagos" },
            { x: "61%", y: "60%", label: "Nairobi" },
            { x: "44%", y: "28%", label: "Accra" },
            { x: "58%", y: "42%", label: "Abuja" },
          ].map((pin) => (
            <div key={pin.label} style={{ position: "absolute", left: pin.x, top: pin.y, transform: "translate(-50%,-50%)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B", boxShadow: "0 0 6px rgba(245,158,11,0.8)" }} />
              <div style={{ color: "#F59E0B", fontSize: 8, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap", marginTop: 2, marginLeft: -10 }}>{pin.label}</div>
            </div>
          ))}
          {/* Legend */}
          <div style={{ position: "absolute", bottom: 12, left: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }} />
            <span style={{ color: "#636366", fontSize: 10, fontFamily: "'Inter', sans-serif" }}>Active site</span>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Attendance card */}
          <div style={{ background: "#1C1C1E", borderRadius: 10, padding: "12px 14px", border: "1px solid #2C2C2E" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <Users size={12} color="#3B82F6" />
              <span style={{ color: "#8E8E93", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>Attendance</span>
            </div>
            {[{ site: "Lekki Ph2", count: 47, max: 60 }, { site: "Victoria Is.", count: 28, max: 35 }].map((s) => (
              <div key={s.site} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: "white", fontSize: 11, fontFamily: "'Inter', sans-serif" }}>{s.site}</span>
                  <span style={{ color: "#8E8E93", fontSize: 11, fontFamily: "'Inter', sans-serif" }}>{s.count}/{s.max}</span>
                </div>
                <div style={{ height: 4, background: "#2C2C2E", borderRadius: 2 }}>
                  <div style={{ height: 4, background: "#22C55E", borderRadius: 2, width: `${(s.count / s.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* AI Alert card */}
          <div style={{ background: "rgba(245,158,11,0.08)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(245,158,11,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <TriangleAlert size={12} color="#F59E0B" />
              <span style={{ color: "#F59E0B", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>AI Alert</span>
            </div>
            <div style={{ color: "white", fontSize: 11, fontFamily: "'Inter', sans-serif", lineHeight: 1.4 }}>Delay risk detected on Block C — Lekki Phase 2</div>
          </div>

          {/* Materials card */}
          <div style={{ background: "#1C1C1E", borderRadius: 10, padding: "12px 14px", border: "1px solid #2C2C2E" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Package size={12} color="#8E8E93" />
              <span style={{ color: "#8E8E93", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>Materials</span>
            </div>
            {[{ label: "Cement", pct: 68 }, { label: "Steel", pct: 42 }].map((m) => (
              <div key={m.label} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ color: "white", fontSize: 11, fontFamily: "'Inter', sans-serif" }}>{m.label}</span>
                  <span style={{ color: "#8E8E93", fontSize: 11, fontFamily: "'Inter', sans-serif" }}>{m.pct}%</span>
                </div>
                <div style={{ height: 4, background: "#2C2C2E", borderRadius: 2 }}>
                  <div style={{ height: 4, background: "#F59E0B", borderRadius: 2, width: `${m.pct}%`, opacity: m.pct < 50 ? 0.6 : 1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="waitlist"
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(72px, 10vw, 100px) clamp(20px, 4vw, 40px) clamp(60px, 8vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Isometric grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse at 50% 40%, rgba(245,158,11,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, rgba(59,130,246,0.04) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Announcement badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          background: "#2C2C2E",
          border: "1px solid #3A3A3C",
          borderRadius: 100,
          padding: "8px 18px",
          marginBottom: 48,
          cursor: "pointer",
        }}
      >
        <span style={{ color: "#F59E0B", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
          Now live in Nigeria, Ghana & Kenya →
        </span>
      </motion.div>

      {/* Headline */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
            {HEADLINE_WORDS_1.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                style={{
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.1,
                  fontSize: "clamp(48px, 6vw, 80px)",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap", marginTop: 8 }}>
          {HEADLINE_WORDS_2.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54 + i * 0.08 }}
              style={{
                color: word === "Delivering." ? "#F59E0B" : "#FFFFFF",
                fontWeight: 900,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.1,
                fontSize: "clamp(48px, 6vw, 80px)",
                position: "relative",
              }}
            >
              {word}
              {word === "Delivering." && (
                <svg
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  style={{ position: "absolute", bottom: -10, left: 0, right: 0, width: "100%", height: 12 }}
                >
                  <path d="M0 8 Q25 2 50 8 Q75 14 100 8 Q125 2 150 8 Q175 14 200 8" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        style={{
          color: "#8E8E93",
          fontSize: 22,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          textAlign: "center",
          maxWidth: 640,
          lineHeight: 1.5,
          margin: "0 0 48px",
        }}
      >
        Tikr is the construction operating system built for Africa. Real-time tracking, worker accountability, AI delay prediction — managed from the field, visible from anywhere.
      </motion.p>

      {/* Email waitlist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        style={{ width: "100%", maxWidth: 520, marginBottom: 16 }}
      >
        <EmailSignup
          dark
          size="lg"
          placeholder="Enter your work email"
          buttonLabel="Join the Waitlist →"
          successMessage="You're on the list! We'll reach out soon."
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.15 }}
        style={{ color: "#636366", fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 56 }}
      >
        Be first to access Tikr · No credit card required
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ textAlign: "center", marginBottom: 64 }}
      >
        <div style={{ color: "#636366", fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>
          Trusted by 200+ construction firms across Africa
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
          {LOGOS.map((logo) => (
            <div
              key={logo}
              style={{
                color: "#3A3A3C",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {logo}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Dashboard mockup with float animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{ position: "relative", width: "100%", maxWidth: 900, zIndex: 10 }}
      >
        {/* Amber glow beneath */}
        <motion.div
          animate={{ opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: -40,
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: 80,
            background: "radial-gradient(ellipse, rgba(245,158,11,0.25) 0%, transparent 70%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />
        {/* Floating animation on the mockup */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <DashboardMockup />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .dash-outer-grid { grid-template-columns: 1fr !important; }
          .dash-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-map-panel { grid-column: 1 / -1 !important; }
        }
      `}</style>
    </section>
  );
}
