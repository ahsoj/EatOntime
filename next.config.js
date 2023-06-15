/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL;

const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: `http://${API_URL}/:path*`,
        },
      ],
    };
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    modularizeImports: {
      "@mui/material": {
        transform: "@mui/material/{{member}}",
      },
      "@mui/icons-material": {
        transform: "@mui/icons-material/{{member}}",
      },
    },
  },
};

module.exports = nextConfig;
