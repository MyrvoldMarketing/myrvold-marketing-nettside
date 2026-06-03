import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "10.0.0.49"],
  output: "standalone",
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
