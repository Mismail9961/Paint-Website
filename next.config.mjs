/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Ignore all ESLint errors and warnings during production build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Automatically remove all console.* statements in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ✅ Allow optimized external images
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

  // ✅ Safe experimental options (optional)
  experimental: {
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
