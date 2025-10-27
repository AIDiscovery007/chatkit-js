import nextConfig from "next/core-web-vitals";

export default [
  {
    ignores: ["node_modules", ".next"],
  },
  ...nextConfig,
];
