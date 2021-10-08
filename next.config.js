const withImages = require('next-images');
const withFonts = require('next-fonts');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // future: {
  //   webpack5: true,
  // },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.module\.css$/,
  //     use: [
  //       {
  //         loader: MiniCssExtractPlugin.loader,
  //       },
  //       {
  //         loader: 'css-loader',
  //         options: {
  //           importLoaders: 1,
  //           modules: {
  //             namedExport: true,
  //             localIdentName: 'vhd[hash:base64:8]',
  //             localIdentHashSalt: 'vhd',
  //           },
  //         },
  //       },
  //     ],
  //   });
  //   return config;
  // },

  cssModules: true,
  eslint: {
    // !! WARN !!
    // This can slow down how long pages take to compile during development
    // !! WARN !!
    dev: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = withBundleAnalyzer(withFonts(withImages(nextConfig)));
