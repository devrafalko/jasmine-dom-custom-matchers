const path = require('path');
const merge = require('webpack-merge').merge;
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

const common = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

const backend = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'dom-matchers.node.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'DOMCustomMatchers',
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    globalObject: 'this'
  },
  target: 'node',
  externals: [nodeExternals()]
};

const frontend = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'dom-matchers.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'DOMCustomMatchers',
    libraryTarget: 'var',
    libraryExport: 'default',
    globalObject: 'this'
  },
  target: 'web'
};

const dev = {
  mode: 'development',
  watch: true,
  stats: {
    version: false,
    colors: true,
    warnings: false,
    assets: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: false,
    providedExports: false,
    publicPath: false,
    timings: true,
    usedExports: false
  }
};

const prod = {
  mode: 'production',
  watch: false,
  stats: false,
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};

module.exports = (env) => {
  return [
    merge(common, env.prod ? prod : dev, backend),
    merge(common, env.prod ? prod : dev, frontend)
  ];
};