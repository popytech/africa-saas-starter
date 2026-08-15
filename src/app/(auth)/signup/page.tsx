import Link from "next/link";
import { signup } from "@/app/actions/auth";

export default function SignupPage() {
  return (
    <main className="container" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section className="card" style={{ width: "min(440px, 100%)", padding: 28 }}>
        <span className="badge">Create a workspace</span>
        <h1 style={{ fontSize: 34, marginBottom: 8 }}>Start building</h1>
        <p className="muted">Create your account, then add your organization.</p>
        <form action={signup} style={{ display: "grid", gap: 14, marginTop: 22 }}>
          <label>Full name<input className="input" name="fullName" required style={{ marginTop: 7 }} /></label>
          <label>Email<input className="input" name="email" type="email" required style={{ marginTop: 7 }} /></label>
          <label>Password<input className="input" name="password" type="password" minLength={8} required style={{ marginTop: 7 }} /></label>
          <button className="btn btn-primary" type="submit">Create account</button>
        </form>
        <p className="muted" style={{ marginBottom: 0 }}>Already registered? <Link href="/login" style={{ color: "var(--accent)" }}>Sign in</Link></p>
      </section>
    </main>
  );
}
