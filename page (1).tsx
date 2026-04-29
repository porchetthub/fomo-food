/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["leaflet", "react-leaflet"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ],
  },
};

export default nextConfig;
