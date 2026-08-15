import Link from "next/link";

const features = [
  ["Authentication", "Cookie-based Supabase SSR auth with protected server routes."],
  ["Multi-tenancy", "Organizations, memberships and role-aware product surfaces."],
  ["RLS by default", "Tenant data access is enforced in PostgreSQL policies."],
  ["Billing-ready", "Vendor-neutral plans and entitlements without fake live payments."],
  ["Email adapter", "Console development provider plus optional Resend HTTP delivery."],
  ["Production plumbing", "Docker, CI, health endpoint and strict TypeScript."],
];

export default function HomePage() {
  return (
    <main>
      <header className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "26px 0" }}>
        <strong>Africa SaaS Starter</strong>
        <div style={{ display: "flex", gap: 10 }}>
          <Link className="btn" href="/login">Sign in</Link>
          <Link className="btn btn-primary" href="/signup">Start building</Link>
        </div>
      </header>

      <section className="container" style={{ padding: "96px 0 60px", textAlign: "center" }}>
        <span className="badge">Open source · MIT · Africa-first perspective</span>
        <h1 style={{ fontSize: "clamp(44px, 8vw, 84px)", maxWidth: 980, margin: "24px auto 20px", letterSpacing: "-0.055em", lineHeight: .98 }}>
          Stop rebuilding the SaaS foundation.
        </h1>
        <p className="muted" style={{ fontSize: 20, lineHeight: 1.6, maxWidth: 720, margin: "0 auto 28px" }}>
          A clean Next.js + Supabase starter with auth, organizations, roles, RLS, dashboard, billing concepts, email, Docker and CI.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/signup">Launch the demo</Link>
          <a className="btn" href="https://github.com/popytech/africa-saas-starter" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>

      <section className="container grid-3" style={{ padding: "34px 0 96px" }}>
        {features.map(([title, description]) => (
          <article className="card" key={title} style={{ padding: 22 }}>
            <h2 style={{ marginTop: 0, fontSize: 18 }}>{title}</h2>
            <p className="muted" style={{ marginBottom: 0, lineHeight: 1.6 }}>{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
