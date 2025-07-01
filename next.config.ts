import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "edupath-lms.fly.storage.tigris.dev",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
