import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return [];

    const normalized = base.replace(/\/+$/, "");
    return [
      {
        source: "/api/:path*",
        destination: `${normalized}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
