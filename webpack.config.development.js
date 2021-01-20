const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'inline-source-map',
  node: {
    console: false,
    global: true,
    process: false,
    __filename: false,
    __dirname: false,
    Buffer: false,
    setImmediate: false
  },
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              presets: [['env', { targets: { node: '8.10' } }]]
            }
          }
        ],
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'swapi-helpers': path.resolve(__dirname, 'helpers'),
      'swapi-database': path.resolve(__dirname, 'database'),
      'swapi-utils': path.resolve(__dirname, 'utils'),
      'swapi-controllers': path.resolve(__dirname, 'controllers'),
      'swapi-repositories': path.resolve(__dirname, 'repositories')
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'resources', to: 'functions/resources' },
      { from: 'database/models', to: 'functions/models' }
    ])
  ]
}