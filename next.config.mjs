/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/password-generator" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/password-generator/" : "",
};

export default nextConfig;
