import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { requireUser } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="container" style={{ padding: "24px 0 60px" }}>
      <header className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, gap: 16, flexWrap: "wrap" }}>
        <div>
          <strong>Africa SaaS Starter</strong>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{user.email}</div>
        </div>
        <nav style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Link className="btn" href="/dashboard">Overview</Link>
          <Link className="btn" href="/dashboard/billing">Billing</Link>
          <Link className="btn" href="/dashboard/settings">Settings</Link>
          <form action={logout}><button className="btn" type="submit">Sign out</button></form>
        </nav>
      </header>
      <main style={{ paddingTop: 22 }}>{children}</main>
    </div>
  );
}
