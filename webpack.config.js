const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const srcRoot = path.resolve(__dirname, 'src');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve('dist'),
        filename: 'bundled.js',
        publicPath: '/'
    },
    resolve: {
        extensions: [
            ".js", ".jsx"
        ],
        modules: [srcRoot, 'node_modules/']
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};