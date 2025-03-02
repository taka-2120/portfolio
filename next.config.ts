import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({});

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    localeDetection: false,
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default withNextra(nextConfig);
