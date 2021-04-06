const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  eslint: {
    // !! WARN !!
    // This can slow down how long pages take to compile during development
    // !! WARN !!
    dev: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
