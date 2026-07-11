import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

if (process.env.NODE_ENV === "development") {
  void import("@opennextjs/cloudflare").then((mod) =>
    mod.initOpenNextCloudflareForDev(),
  );
}

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:locale(en|vi)/blog",
        destination: "/:locale/notes",
        permanent: true,
      },
      {
        source: "/:locale(en|vi)/blog/:slug",
        destination: "/:locale/notes/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default withIntlayer(nextConfig);
