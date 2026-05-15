/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'huggingface.co' },
      { protocol: 'https', hostname: 'ollama.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'seeklogo.com' },
      { protocol: 'https', hostname: 'production-media.paperswithcode.com' },
      { protocol: 'https', hostname: 'seaborn.pydata.org' },
    ],
  },
};

export default nextConfig;
