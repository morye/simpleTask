const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
			NODE_ENV: `'production'`
		  }
		}),
		new UglifyJSPlugin({
			sourceMap: true
		})
	  ]
});