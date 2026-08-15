import type { NextConfig } from "next";

const useStandaloneOutput = process.env.NEXT_STANDALONE === "true";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(useStandaloneOutput ? { output: "standalone" as const } : {}),
};

export default nextConfig;
