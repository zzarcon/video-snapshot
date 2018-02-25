const path = require('path');

module.exports = {
  devServer: {
    
  },
  entry: './index.jsx',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
};