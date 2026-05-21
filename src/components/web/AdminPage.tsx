import { useState, useCallback } from "react";

const API_URL = (import.meta.env.VITE_WAITLIST_API ?? "https://api.buildafr.com") + "/waitlist";
const ADMIN_SECRET = "bfr_adm_2026_K9xPmQr7wNsT";

interface WaitlistEntry {
  email: string;
  role?: string;
  source?: string;
  created_at: string;
  ip?: string;
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchWaitlist = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${ADMIN_SECRET}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEntries(data.emails ?? []);
    } catch (err: unknown) {
      setFetchError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== ADMIN_SECRET) {
      setAuthError("Incorrect admin key.");
      return;
    }
    setAuthed(true);
    fetchWaitlist();
  };

  const exportCSV = () => {
    const rows = [["Email", "Role", "Source", "Signed Up", "IP"]];
    entries.forEach((e) =>
      rows.push([e.email, e.role ?? "", e.source ?? "", e.created_at, e.ip ?? ""])
    );
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `buildafr-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyEmails = () => {
    const emails = filtered.map((e) => e.email).join("\n");
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = entries.filter(
    (e) =>
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      (e.role ?? "").toLowerCase().includes(search.toLowerCase())
  );

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            background: "#1C1C1E",
            border: "1px solid #2C2C2E",
            borderRadius: 16,
            padding: 40,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <img src="/logo-primary.png" alt="Buildafr" style={{ height: 52, objectFit: "contain", marginBottom: 16 }} />
            <div style={{ color: "#636366", fontSize: 14 }}>Waitlist Admin</div>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ color: "#8E8E93", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                Admin Key
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(""); }}
                placeholder="Enter admin key"
                autoFocus
                style={{
                  width: "100%",
                  height: 48,
                  background: "#0A0A0A",
                  border: `1.5px solid ${authError ? "#EF4444" : "#2C2C2E"}`,
                  borderRadius: 10,
                  padding: "0 16px",
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontFamily: "'Inter', sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {authError && (
                <div style={{ color: "#EF4444", fontSize: 13, marginTop: 6 }}>{authError}</div>
              )}
            </div>
            <button
              type="submit"
              style={{
                height: 48,
                background: "#F59E0B",
                color: "#0A0A0A",
                border: "none",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Sign In →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}>
      {/* Header */}
      <div style={{ background: "#1C1C1E", borderBottom: "1px solid #2C2C2E", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="/logo-primary.png" alt="Buildafr" style={{ height: 44, objectFit: "contain" }} />
          <span style={{ color: "#636366", fontSize: 14 }}>/ Waitlist Admin</span>
          <a href="/admin/mailer" style={{ color: "#636366", fontSize: 13, textDecoration: "none", padding: "6px 12px", background: "#2C2C2E", borderRadius: 6, marginLeft: 8 }}>Mailer →</a>
        </div>
        <button
          onClick={fetchWaitlist}
          style={{ background: "#2C2C2E", border: "none", color: "#FFFFFF", fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}
        >
          {loading ? "Refreshing…" : "↻ Refresh"}
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Signups", value: entries.length },
            { label: "This Week", value: entries.filter((e) => new Date(e.created_at) > new Date(Date.now() - 7 * 864e5)).length },
            { label: "Showing", value: filtered.length },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ color: "#636366", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                {stat.label}
              </div>
              <div style={{ color: "#F59E0B", fontSize: 32, fontWeight: 800 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email or role…"
            style={{
              flex: 1,
              minWidth: 200,
              height: 40,
              background: "#1C1C1E",
              border: "1px solid #2C2C2E",
              borderRadius: 8,
              padding: "0 14px",
              color: "#FFFFFF",
              fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              outline: "none",
            }}
          />
          <button
            onClick={copyEmails}
            style={{ height: 40, padding: "0 16px", background: "#2C2C2E", border: "none", color: "#FFFFFF", fontSize: 13, fontWeight: 600, borderRadius: 8, cursor: "pointer" }}
          >
            {copied ? "✓ Copied!" : "Copy Emails"}
          </button>
          <button
            onClick={exportCSV}
            style={{ height: 40, padding: "0 16px", background: "#F59E0B", border: "none", color: "#0A0A0A", fontSize: 13, fontWeight: 700, borderRadius: 8, cursor: "pointer" }}
          >
            Export CSV
          </button>
        </div>

        {/* Error */}
        {fetchError && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "14px 18px", color: "#FCA5A5", fontSize: 14, marginBottom: 20 }}>
            Error: {fetchError} — Make sure the PHP API is deployed to buildafr.com/waitlist-api.php
          </div>
        )}

        {/* Table */}
        <div style={{ background: "#1C1C1E", border: "1px solid #2C2C2E", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2C2C2E" }}>
                {["#", "Email", "Role", "Source", "Signed Up"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      color: "#636366",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} style={{ padding: 40, textAlign: "center", color: "#636366", fontSize: 14 }}>
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 40, textAlign: "center", color: "#636366", fontSize: 14 }}>
                    {entries.length === 0 ? "No signups yet." : "No results for your search."}
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((entry, i) => (
                  <tr
                    key={entry.email}
                    style={{
                      borderBottom: i < filtered.length - 1 ? "1px solid #2C2C2E" : "none",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2C2C2E"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <td style={{ padding: "14px 16px", color: "#636366", fontSize: 13 }}>{i + 1}</td>
                    <td style={{ padding: "14px 16px", color: "#FFFFFF", fontSize: 14, fontWeight: 500 }}>{entry.email}</td>
                    <td style={{ padding: "14px 16px", color: "#8E8E93", fontSize: 13 }}>{entry.role || "—"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: entry.source === "website" ? "rgba(245,158,11,0.15)" : "rgba(99,99,102,0.2)",
                          color: entry.source === "website" ? "#F59E0B" : "#8E8E93",
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 8px",
                          borderRadius: 4,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {entry.source || "website"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#636366", fontSize: 13 }}>{formatDate(entry.created_at)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16, color: "#3A3A3C", fontSize: 12, textAlign: "center" }}>
          Buildafr Admin · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
