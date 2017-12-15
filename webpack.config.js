var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    entry: {
        main: './assets/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        publicPath: '/public/',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'src/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    devtool: "source-map",

    plugins: [
        new ExtractTextPlugin({filename: '[name].css', allChunks: true})
    ]
};