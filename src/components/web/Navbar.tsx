import { useState } from "react";
import { X, Menu } from "lucide-react";

const NAV_LINKS: { label: string; target: string }[] = [
  { label: "Features", target: "features" },
  { label: "Pricing", target: "pricing" },
  { label: "How It Works", target: "how-it-works" },
  { label: "Case Studies", target: "case-studies" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Spacer so content isn't hidden behind fixed nav */}
      <div style={{ height: 64, flexShrink: 0 }} />
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E5EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          zIndex: 1000,
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <img src="/logo-primary.png" alt="Buildafr" style={{ height: 36, objectFit: "contain" }} />
        </div>

        {/* Center nav links — hidden on mobile */}
        <div
          style={{ display: "flex", gap: 36, position: "absolute", left: "50%", transform: "translateX(-50%)" }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(({ label, target }) => (
            <button
              key={label}
              onClick={() => scrollTo(target)}
              style={{
                background: "none",
                border: "none",
                color: "#1C1C1E",
                fontSize: 15,
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                position: "relative",
                paddingBottom: 2,
                padding: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (el) el.style.width = "100%";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                if (el) el.style.width = "0%";
              }}
            >
              {label}
              <span
                className="nav-underline"
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: "0%",
                  height: 2,
                  background: "#F59E0B",
                  transition: "width 0.2s ease",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <button
            onClick={() => scrollTo("waitlist")}
            style={{
              background: "#0A0A0A",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              border: "none",
              height: 40,
              padding: "0 20px",
              borderRadius: 8,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "opacity 0.15s",
            }}
            className="desktop-nav"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            Join the Waitlist →
          </button>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#0A0A0A",
              display: "none",
              padding: 4,
            }}
            className="mobile-hamburger"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#FFFFFF",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
            padding: "0 24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
            <img src="/logo-primary.png" alt="Buildafr" style={{ height: 34, objectFit: "contain" }} />
            <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#0A0A0A" }}>
              <X size={24} />
            </button>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, paddingTop: 24 }}>
            {NAV_LINKS.map(({ label, target }) => (
              <button
                key={label}
                onClick={() => { scrollTo(target); setMobileOpen(false); }}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #E5E5EA",
                  color: "#0A0A0A",
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "left",
                  padding: "16px 0",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
              <button
                onClick={() => { scrollTo("waitlist"); setMobileOpen(false); }}
                style={{
                  background: "#0A0A0A",
                  color: "white",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  border: "none",
                  padding: "14px 0",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Join the Waitlist →
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
