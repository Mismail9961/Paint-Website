/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
    ],
  },

  // ✅ Automatically removes all console.* statements in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // (optional) Helpful if you use experimental Next.js 15 features
  experimental: {
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
