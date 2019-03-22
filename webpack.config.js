const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        components: './Content/components/expose-components.js'
    },
    output: {
        filename: '[name].js',
        globalObject: 'this',
        path: path.resolve(__dirname, 'wwwroot/dist'),
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    optimization: {
        runtimeChunk: {
            name: 'runtime', // necessary when using multiple entrypoints on the same page
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }, {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ],
    },
    watch: true,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
};