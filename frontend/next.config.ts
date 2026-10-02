import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: '/services/takeoffs', destination: '/services/estimating', permanent: true },
      { source: '/services/bid-prep', destination: '/services/estimating', permanent: true },
      { source: '/services/precon', destination: '/services/estimating', permanent: true },
      { source: '/services/drafting', destination: '/services/architectural-drawings', permanent: true },
      {
        source: '/services/permit-ready-structural-drawings',
        destination: '/services/permit-support-structural-drawings',
        permanent: true,
      },
      { source: '/estimation', destination: '/services/estimating', permanent: true },
      { source: '/markets', destination: '/who-we-serve', permanent: true },
      { source: '/insights', destination: '/', permanent: true },
      { source: '/insights/:path*', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
