import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore — supported at runtime, missing from types
    allowedDevOrigins: [
      "https://*.ngrok-free.dev",
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
