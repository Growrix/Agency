import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.replit.dev", "*.worf.replit.dev", "localhost", "127.0.0.1", "192.168.0.100"],
};

export default nextConfig;
