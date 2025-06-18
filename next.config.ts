import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cloudinary.com https://*.cloudinary.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: blob: https://res.cloudinary.com;
              media-src 'self' blob: https://res.cloudinary.com;
              connect-src 'self' https://analytics-api-s.cloudinary.com https://res.cloudinary.com;
              frame-src 'self' https://player.cloudinary.com;
              worker-src 'self' blob:;
            `
              .replace(/\n/g, "")
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
