import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    // English is the default language. Hebrew will live at /he once it's written.
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
