/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            }
        ]
    }
};
import path from 'path';

nextConfig.webpack = (config) => {
  config.resolve.alias['@components'] = path.join(__dirname, 'components');
  return config;
};

export default nextConfig;
