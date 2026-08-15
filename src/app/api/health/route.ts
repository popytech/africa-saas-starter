import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "africa-saas-starter",
    timestamp: new Date().toISOString(),
  });
}
