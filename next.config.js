/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  // basePath: "/home",
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
