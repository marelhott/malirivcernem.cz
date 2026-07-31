import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/realizace/kavarna-misto-letna",
        destination: "/realizace/kavarna-misto-hradec-kralove",
        permanent: true,
      },
      {
        source: "/realizace/penthouse-smichov-city",
        destination: "/realizace/pension-jizerske-hory",
        permanent: true,
      },
      {
        source: "/realizace/hotel-wellness-na-slupi",
        destination: "/realizace/garsonka-praha-6-dejvice",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-router": path.resolve("./src/compat/react-router.tsx"),
    };
    return config;
  },
};

export default nextConfig;
