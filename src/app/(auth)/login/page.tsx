import Link from "next/link";
import { login } from "@/app/actions/auth";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;
  return (
    <main className="container" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section className="card" style={{ width: "min(440px, 100%)", padding: 28 }}>
        <span className="badge">Welcome back</span>
        <h1 style={{ fontSize: 34, marginBottom: 8 }}>Sign in</h1>
        <p className="muted">Access your SaaS workspace.</p>
        {message ? <p style={{ padding: 12, border: "1px solid var(--line)", borderRadius: 12 }}>{message}</p> : null}
        <form action={login} style={{ display: "grid", gap: 14, marginTop: 22 }}>
          <label>Email<input className="input" name="email" type="email" required style={{ marginTop: 7 }} /></label>
          <label>Password<input className="input" name="password" type="password" minLength={8} required style={{ marginTop: 7 }} /></label>
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
        <p className="muted" style={{ marginBottom: 0 }}>No account? <Link href="/signup" style={{ color: "var(--accent)" }}>Create one</Link></p>
      </section>
    </main>
  );
}
