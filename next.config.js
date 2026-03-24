/** @type {import('next').NextConfig} */

function getImageRemotePatterns() {
  const raw =
    process.env.NEXT_PUBLIC_IMAGE_URL || `http://localhost:8080/static`;

  try {
    const u = new URL(raw);
    const pattern = {
      protocol: u.protocol.replace(`:`, ``),
      hostname: u.hostname,
      pathname: `/**`,
    };
    if (u.port) {
      pattern.port = u.port;
    }
    return [pattern];
  } catch {
    return [
      {
        protocol: `http`,
        hostname: `localhost`,
        pathname: `/**`,
      },
    ];
  }
}

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
  },
  images: {
    remotePatterns: getImageRemotePatterns(),
    unoptimized: true,
  },
};

module.exports = nextConfig;
