import { requireUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await requireUser();
  return (
    <section className="card" style={{ padding: 24 }}>
      <span className="badge">Account</span>
      <h1>Settings</h1>
      <p className="muted">Authenticated user ID</p>
      <code style={{ wordBreak: "break-all" }}>{user.id}</code>
      <p className="muted">Email</p>
      <strong>{user.email}</strong>
    </section>
  );
}
