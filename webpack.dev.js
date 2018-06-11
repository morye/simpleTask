const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'eval-source-map',
	watch: true,
	watchOptions: {
		aggregateTimeout:300,
		poll: 1000,
		ignored:/node_modules/
	}
});