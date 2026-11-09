import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  allowedDevOrigins: ["192.168.4.255"],
  images: {
    remotePatterns: [
      new URL("https://cdn-images.dzcdn.net/images/**"),
      new URL("https://i.ytimg.com/vi/**"),
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
