import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "*.ngrok-free.dev",
        "localhost:3000"
      ],
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vsmicouphxhyjjhrjrih.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;