const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Webpack setup.
 *
 * I definitely wrote this specifically for this app and didn't copy and paste it from a different one.
 */
module.exports = {
    entry: './src/client/js/index.jsx',

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    output: {
        publicPath: '/',
        path: path.join(__dirname, '../build'),
        filename: 'app.bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(['../build'], { allowExternal: true }),

        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: '[id].css',
        }),

        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './src/client/static/template.html',
        }),

        new webpack.ProvidePlugin({
            _: 'lodash',
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
