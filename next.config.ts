import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  allowedDevOrigins: ["192.168.4.43"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
