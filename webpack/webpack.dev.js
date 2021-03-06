const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const PORT = process.env.PORT || '3030';

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: './build',
        hot: true,
        port: PORT,
        historyApiFallback: true,
    },
    devtool: 'inline-source-map',

    plugins: [new webpack.HotModuleReplacementPlugin()],
});
