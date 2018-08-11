const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.join(__dirname, './client/app.js')],
  output: {
    path: path.resolve(__dirname, './client/dist'),
    publicPath: 'client/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['stage-0']
        }
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
