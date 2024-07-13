/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: 'cdn.britannica.com'},
            {hostname:'www.shutterstock.com'},
            {hostname:'thinkfortech.com' }
            ]
    },
  };
  
  export default nextConfig;
  