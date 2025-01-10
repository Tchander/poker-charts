import TerserPlugin from 'terser-webpack-plugin';
import getDevServerConfig from './getDevServerConfig';
import getPlugins from './getPlugins';
import getRules from './getRules';
import { distDir, srcDir, appDir, uiDir, scssModulesDir } from './paths';
import getArgs from './getArgs';
import type { Configuration } from 'webpack';
import type { Target } from '@/types/builder';

const JS_FILE_NAME = '[name].[contenthash:8].js';
const BASE_URL = '/';

const { mode, analyze: bundleAnalyze } = getArgs();
const isDev = mode === 'development';
const isProd = mode === 'production';

const target: Target = {
  mode,
  bundleAnalyze,
  env: {
    APP_MODE: mode,
    BASE_URL,
    VUE_APP_TITLE: 'Poker Charts',
    VUE_APP_LANGUAGE: 'ru',
  },
};

const alias = {
  '@': srcDir,
  '@ui': uiDir,
  '@modules': scssModulesDir,
};

const output: Configuration['output'] = {
  path: distDir,
  filename: `js/${JS_FILE_NAME}`,
  publicPath: target.env.BASE_URL,
  uniqueName: 'poker_charts_app',
  chunkFilename: `js/${JS_FILE_NAME}`,
  clean: true,
};

const optimization: Configuration['optimization'] = {
  chunkIds: 'named',

  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        filename: `js/vendors/${JS_FILE_NAME}`,
      },
      store: {
        test: /[\\/]stores[\\/]/,
        filename: `js/stores/${JS_FILE_NAME}`,
        enforce: true,
      },
    },
  },

  minimize: isProd,
  minimizer: [
    new TerserPlugin({
      minify: TerserPlugin.swcMinify,
      // `terserOptions` options will be passed to `swc` (`@swc/core`)
      // Link to options - https://swc.rs/docs/config-js-minify
      terserOptions: {},
    }),
  ],
};

const config: Configuration = {
  mode,
  devtool: isDev ? 'eval-cheap-module-source-map' : false,
  entry: {
    app: appDir,
  },
  resolve: {
    alias,
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
  },
  output,
  module: {
    rules: getRules(target),
  },
  plugins: getPlugins(target),
  devServer: getDevServerConfig(target),
  optimization,
};

export default config;
