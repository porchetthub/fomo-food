/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.abruzzoturismo.it",
      "www.valledelgransasso.it",
      "www.socialcicero.com",
      "www.streetfood42.com",
      "substackcdn.com",
      "www.virtuquotidiane.it",
      "unpkg.com"
    ],
  },
};

export default nextConfig;
