import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

nextConfig.webpack = (config) => {
  config.resolve.alias['@components'] = path.join(__dirname, 'components');
  return config;
};

export default nextConfig;
