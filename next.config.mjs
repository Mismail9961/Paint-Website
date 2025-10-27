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
  
    async rewrites() {
      return [
        // ✅ Fix Clerk 404 issue
        {
          source: "/npm/:path*",
          destination: "https://clerk.qualitypaintpalace.store/npm/:path*",
        },
      ];
    },
  };
  
  export default nextConfig;
  