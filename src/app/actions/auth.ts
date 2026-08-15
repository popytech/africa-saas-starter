"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string" || !value.trim()) throw new Error(`Missing ${name}`);
  return value.trim();
}

async function getRequestOrigin() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  return host ? `${protocol}://${host}` : "http://localhost:3000";
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = field(formData, "email");
  const password = field(formData, "password");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const fullName = field(formData, "fullName");
  const email = field(formData, "email");
  const password = field(formData, "password");
  const origin = await getRequestOrigin();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}`);
  redirect("/login?message=Check your email to confirm your account.");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
