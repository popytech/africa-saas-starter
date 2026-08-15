import { createOrganization } from "@/app/actions/organization";
import { getCurrentMemberships } from "@/lib/auth";

export default async function DashboardPage() {
  const memberships = await getCurrentMemberships();
  return (
    <section>
      <span className="badge">Authenticated workspace</span>
      <h1 style={{ fontSize: 42, marginBottom: 8 }}>Dashboard</h1>
      <p className="muted" style={{ maxWidth: 680 }}>This protected surface is the starting point for your product modules.</p>

      <div className="grid-3" style={{ marginTop: 24 }}>
        <article className="card" style={{ padding: 22 }}><div className="muted">Organizations</div><div style={{ fontSize: 36, fontWeight: 800, marginTop: 8 }}>{memberships.length}</div></article>
        <article className="card" style={{ padding: 22 }}><div className="muted">Current plan</div><div style={{ fontSize: 28, fontWeight: 800, marginTop: 12 }}>Free</div></article>
        <article className="card" style={{ padding: 22 }}><div className="muted">System</div><div style={{ fontSize: 28, fontWeight: 800, marginTop: 12, color: "var(--accent)" }}>Healthy</div></article>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginTop: 22 }}>
        <article className="card" style={{ padding: 22 }}>
          <h2 style={{ marginTop: 0 }}>Your organizations</h2>
          {memberships.length === 0 ? (
            <p className="muted">No organization yet. Create the first workspace below.</p>
          ) : (
            <ul style={{ paddingLeft: 20, lineHeight: 1.9 }}>
              {memberships.map((membership) => {
                const organization = Array.isArray(membership.organizations)
                  ? membership.organizations[0]
                  : membership.organizations;
                return <li key={membership.id}>{organization?.name ?? "Organization"} · <span className="muted">{membership.role}</span></li>;
              })}
            </ul>
          )}
        </article>

        <article className="card" style={{ padding: 22 }}>
          <h2 style={{ marginTop: 0 }}>Create workspace</h2>
          <form action={createOrganization} style={{ display: "grid", gap: 12 }}>
            <label>Organization name<input className="input" name="name" minLength={2} required style={{ marginTop: 7 }} placeholder="Acme Africa" /></label>
            <button className="btn btn-primary" type="submit">Create organization</button>
          </form>
        </article>
      </div>
    </section>
  );
}
