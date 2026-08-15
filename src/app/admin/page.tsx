import { requireAnyRole } from "@/lib/auth";

export default async function AdminPage() {
  const membership = await requireAnyRole(["owner", "admin"]);
  return (
    <main className="container" style={{ padding: "60px 0" }}>
      <section className="card" style={{ padding: 28 }}>
        <span className="badge">Role gate</span>
        <h1>Admin surface</h1>
        <p className="muted">You reached this page with the <strong>{membership.role}</strong> role.</p>
      </section>
    </main>
  );
}
