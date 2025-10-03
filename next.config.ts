import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb",
    },
  },
  images:{
    domains: ["avatars.githubusercontent.com"]
  }
};

export default nextConfig;