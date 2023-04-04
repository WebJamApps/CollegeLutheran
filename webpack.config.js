/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ProvidePlugin } = require('webpack');
const webpack = require('webpack');

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || []; // eslint-disable-line no-mixed-operators
const when = (condition, config, negativeConfig) => (condition ? ensureArray(config) : ensureArray(negativeConfig));

// primary config:
const title = 'College Lutheran Church';
const outDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const baseUrl = '/';
// const scssRules = [{ loader: 'sass-loader' }];

module.exports = (env) => ({
  resolve: {
    alias: { src: srcDir},
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer'),
    }, // needed for dedoding jwt
  },

  entry: {
    app: [`${srcDir}/Main.tsx`],
    vendor: [
      // 'jquery', 
    'bootstrap'],
  },

  mode: env.production ? 'production' : 'development',

  output: {
    path: outDir,
    publicPath: baseUrl,
    filename: env.production ? '[name].[chunkhash].bundle.js' : '[name].[fullhash].bundle.js',
    chunkFilename: env.production ? '[name].[chunkhash].chunk.js' : '[name].[fullhash].chunk.js',
  },

  performance: { hints: false },

  devServer: {
    static: outDir,
    hot: true,
    historyApiFallback: { // serve index.html for all 404 (required for push-state)
      rewrites: [
        { from: /^\/$/, to: '/' },
        { from: /^\//, to: '/' },
        { from: /./, to: '/' },
      ],
    },
    port: parseInt(process.env.PORT, 10),
  },

  devtool: env.production ? 'nosources-source-map' : 'source-map',

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles', test: /\.css$/i, chunks: 'all', enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        exclude: env.production ? [/node_modules/,/test/] : /node_modules/,
        options: {
          configFile: env.production ? "tsconfig.build.json" : "tsconfig.json"
      }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      // SCSS required in JS/TS files should use the style-loader that auto-injects it into the website
      // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
      {
        test: /\.scss$/,
        // issuer: [{ not: [{ test: /\.html$/i }] }],
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      // Still needed for some node modules that use CSS
      {
        test: /\.css$/i,
        // issuer: [{ not: [{ test: /\.html$/i }] }],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      { test: /\.html$/i, loader: 'html-loader' },
      { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
      // load these fonts normally, as files:
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
    ],
  },

  plugins: [
    new ProvidePlugin({
      // $: 'jquery',
      // jQuery: 'jquery',
      // 'window.jQuery': 'jquery',
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.ejs`,
      minify: env.production ? { removeComments: true, collapseWhitespace: true } : undefined,
      metadata: { title, baseUrl },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static/favicon.ico', to: 'favicon.ico' },
      ],
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV',
      'BackendUrl', 'GoogleClientId', 'userRoles', 'HashString', 'TINY_KEY']),
    ...when(env.analyze, new BundleAnalyzerPlugin()),
  ],
});
