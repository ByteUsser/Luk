/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/fotograf/nowy-wisnicz",
        destination: "/fotograf/powiat-bochenski",
        permanent: true
      },
      {
        source: "/fotograf/krolowka",
        destination: "/fotograf/powiat-bochenski",
        permanent: true
      },
      {
        source: "/fotograf/trzciana",
        destination: "/fotograf/powiat-bochenski",
        permanent: true
      },
      {
        source: "/fotograf/lapanow",
        destination: "/fotograf/powiat-bochenski",
        permanent: true
      },
      {
        source: "/fotograf/lakta-dolna",
        destination: "/fotograf/powiat-bochenski",
        permanent: true
      },
      {
        source: "/fotograf/lakta-gorna",
        destination: "/fotograf/powiat-bochenski",
        permanent: true
      },
      {
        source: "/fotograf/zegocina",
        destination: "/fotograf/powiat-bochenski",
        permanent: true
      },
      {
        source: "/fotograf/limanowa",
        destination: "/fotograf",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "luk-app.vercel.app" }],
        destination: "https://janiczekfoto.pl/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.janiczekfoto.pl" }],
        destination: "https://janiczekfoto.pl/:path*",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" }
        ]
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "luk-app.vercel.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }]
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }]
      }
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [68, 72, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  }
};

export default nextConfig;
