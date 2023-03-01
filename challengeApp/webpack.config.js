const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: true,
                }
            },
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, "css-loader" ],
            },
            {
                test: /\.s[ca]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "./design-guide.html"),
            filename: "design-guide.html"
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "./site/home-page.html"),
            filename: "index.html"
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "./site/news-page.html"),
            filename: "news.html"
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "./site/contact-page.html"),
            filename: "contact-page.html"
        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "./site/about-us.html"),
            filename: "about-us.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ]
}