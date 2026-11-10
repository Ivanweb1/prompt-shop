import type { NextConfig } from "next";

// SITE_BASE_PATH="" — сборка для своего домена (HostKey), иначе адрес GitHub Pages /prompt-shop
const basePath = process.env.SITE_BASE_PATH ?? (process.env.PAGES_BASE_PATH || "/prompt-shop");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
