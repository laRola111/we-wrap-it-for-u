/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable CSS minification — cssnano crashes on mask-image radial-gradient syntax
  experimental: {
    optimizeCss: false,
  },
  webpack: (config, { isServer }) => {
    // Find the CSS minimizer and disable it to avoid cssnano crash
    if (!isServer && config.optimization && config.optimization.minimizer) {
      config.optimization.minimizer = config.optimization.minimizer.filter(
        (plugin) => plugin.constructor.name !== 'CssMinimizerPlugin'
      );
    }
    return config;
  },
};

module.exports = nextConfig;
