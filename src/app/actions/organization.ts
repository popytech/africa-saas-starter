"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createOrganization(formData: FormData) {
  const value = formData.get("name");
  if (typeof value !== "string" || value.trim().length < 2) {
    throw new Error("Organization name must contain at least 2 characters.");
  }

  const user = await requireUser();
  const supabase = await createClient();
  const suffix = crypto.randomUUID().slice(0, 6);
  const slug = `${slugify(value)}-${suffix}`;

  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .insert({ name: value.trim(), slug, owner_id: user.id })
    .select("id")
    .single();

  if (organizationError) throw new Error(organizationError.message);

  const { error: membershipError } = await supabase.from("memberships").insert({
    organization_id: organization.id,
    user_id: user.id,
    role: "owner",
  });

  if (membershipError) throw new Error(membershipError.message);
  revalidatePath("/dashboard");
}
