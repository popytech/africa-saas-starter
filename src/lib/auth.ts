import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type MembershipRole = "owner" | "admin" | "member";

export async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims?.sub) redirect("/login");

  return {
    id: String(claims.sub),
    email: typeof claims.email === "string" ? claims.email : null,
  };
}

export async function getCurrentMemberships() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("memberships")
    .select("id, organization_id, role, organizations(id, name, slug)")
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function requireAnyRole(roles: MembershipRole[]) {
  const memberships = await getCurrentMemberships();
  const membership = memberships.find((item) => roles.includes(item.role as MembershipRole));
  if (!membership) redirect("/dashboard");
  return membership;
}
