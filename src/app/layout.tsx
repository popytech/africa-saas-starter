import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Africa SaaS Starter",
    template: "%s · Africa SaaS Starter",
  },
  description: "Production-minded SaaS starter with Next.js, TypeScript and Supabase.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
