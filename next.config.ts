import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  reactStrictMode: false,  // This was a solution I found to checkboxes getting double clicked in the admin section
};
