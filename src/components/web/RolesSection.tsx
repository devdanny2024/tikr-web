import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { HardHat, Wrench, ClipboardList, Package, Eye, BarChart3 } from "lucide-react";

const ROLES = [
  {
    icon: <HardHat size={28} color="#F59E0B" />,
    name: "Site Supervisor",
    desc: "Submit daily reports, manage worker attendance, log incidents and site progress in real time.",
  },
  {
    icon: <Wrench size={28} color="#F59E0B" />,
    name: "Contractor",
    desc: "Track assigned tasks, log material usage, upload proof of work completion.",
  },
  {
    icon: <ClipboardList size={28} color="#F59E0B" />,
    name: "Project Manager",
    desc: "Monitor all active sites, assign tasks to teams, review daily reports and milestones.",
  },
  {
    icon: <Package size={28} color="#F59E0B" />,
    name: "Procurement Officer",
    desc: "Log material deliveries, manage inventory, raise procurement requests and track suppliers.",
  },
  {
    icon: <Eye size={28} color="#F59E0B" />,
    name: "Client / Investor",
    desc: "View real-time project progress, milestone status, site photo timelines, and delivery reports.",
  },
  {
    icon: <BarChart3 size={28} color="#F59E0B" />,
    name: "Executive / Admin",
    desc: "Full platform access — analytics, financial visibility, contractor oversight, and AI insights.",
  },
];

export function RolesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="roles"
      style={{ background: "#1C1C1E", padding: "clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 64 }}
      >
        <h2 style={{ color: "#FFFFFF", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
          Built for every person on the project
        </h2>
        <p style={{ color: "#8E8E93", fontSize: 18, fontFamily: "'Inter', sans-serif" }}>
          One platform, six roles, zero confusion.
        </p>
      </motion.div>

      <div
        style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        className="roles-grid"
      >
        {ROLES.map((role, i) => (
          <motion.div
            key={role.name}
            initial={{ opacity: 0, x: i % 3 === 0 ? -20 : i % 3 === 1 ? 0 : 20, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            style={{
              background: "#2C2C2E",
              border: "1px solid #3A3A3C",
              borderRadius: 16,
              padding: "28px 24px",
              transition: "border-color 0.2s, box-shadow 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.35)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(245,158,11,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#3A3A3C";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div style={{ marginBottom: 14 }}>{role.icon}</div>
            <div style={{ color: "white", fontSize: 18, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 10 }}>{role.name}</div>
            <div style={{ color: "#8E8E93", fontSize: 14, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>{role.desc}</div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .roles-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .roles-grid { grid-template-columns: 1fr !important; overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}
