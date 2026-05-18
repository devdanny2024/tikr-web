import { useState } from "react";

interface EmailSignupProps {
  dark?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  size?: "sm" | "md" | "lg";
}

export function EmailSignup({
  dark = false,
  placeholder = "Enter your work email",
  buttonLabel = "Join the Waitlist →",
  successMessage = "You're on the list! We'll be in touch soon.",
  size = "md",
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const heights = { sm: 44, md: 52, lg: 60 };
  const fontSizes = { sm: 13, md: 15, lg: 17 };
  const h = heights[size];
  const fs = fontSizes[size];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: dark ? "rgba(34,197,94,0.1)" : "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.3)",
          borderRadius: 12,
          padding: "14px 20px",
          maxWidth: 520,
          margin: "0 auto",
        }}
      >
        <span style={{ fontSize: 20 }}>✓</span>
        <span
          style={{
            color: dark ? "#22C55E" : "#166534",
            fontSize: fs,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
          }}
        >
          {successMessage}
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: 10,
        maxWidth: 520,
        margin: "0 auto",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        required
        style={{
          flex: 1,
          minWidth: 220,
          height: h,
          background: dark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
          border: `1.5px solid ${focused ? "#F59E0B" : dark ? "rgba(255,255,255,0.12)" : "#E5E5EA"}`,
          borderRadius: 10,
          padding: "0 16px",
          color: dark ? "#FFFFFF" : "#0A0A0A",
          fontSize: fs,
          fontFamily: "'Inter', sans-serif",
          outline: "none",
          transition: "border-color 0.15s",
          boxSizing: "border-box",
        }}
      />
      <button
        type="submit"
        style={{
          height: h,
          padding: `0 ${size === "lg" ? 28 : 22}px`,
          background: dark ? "#FFFFFF" : "#0A0A0A",
          color: dark ? "#0A0A0A" : "#FFFFFF",
          border: "none",
          borderRadius: 10,
          fontSize: fs,
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "transform 0.15s, box-shadow 0.15s, opacity 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
          (e.currentTarget as HTMLElement).style.opacity = "0.9";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.opacity = "1";
        }}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
