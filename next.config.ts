import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "eye3jkmvuw.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
