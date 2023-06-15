/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL;

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
  reactStrictMode: false,
  output: "export",
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
