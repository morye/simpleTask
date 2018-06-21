const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
	  index: './src/js/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: './'
  },
  plugins: [
	  new CleanWebpackPlugin(['dist']),
	  new HtmlWebpackPlugin({
		    template: './src/html/index.html'
	  })
	],
  resolve: {
	   extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader'
      },
	  {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
};
