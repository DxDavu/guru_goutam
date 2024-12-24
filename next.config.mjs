/** @type {import('next').NextConfig} */
export const nextConfig = {
  images: {
    // domains: ["res.cloudinary.com"], // Add Cloudinary's domain here
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      port: '',
      pathname: '/**',
      // search: '',
    },]
  },
};

export default nextConfig;
