/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: "raw-loader",
    });
    return config;
  },
  redirects() {
    return [
      {
        source: "/nfts/:path*", // リダイレクト元のURL
        destination: "/", // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
    ];
  },
};

module.exports = nextConfig;
