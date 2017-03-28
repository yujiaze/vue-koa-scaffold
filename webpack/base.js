const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.join(__dirname, '..');
const BUILD_PATH = path.join(__dirname, '..', '/build');
const PUBLIC_PATH = '/build/';
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('shelljs/global');

rm('-rf', [ROOT_PATH + '/build']);
module.exports = [
    {
        // The configuration for the client
        name: "browser",
        entry: [
            "babel-polyfill",
            "./app/app.js"
        ],
        output: {
            path: BUILD_PATH,
            filename: "[hash].js",
            publicPath: PUBLIC_PATH
        },
        devtool: 'source-map',
        module: {
            loaders: [
                { test: /\.svg\??.*$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=[name].[ext]' },
                { test: /\.woff\??.*$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=[name].[ext]' },
                { test: /\.woff2\??.*$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=[name].[ext]' },
                { test: /\.[ot]tf\??.*$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=[name].[ext]' },
                { test: /\.eot\??.*$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]' },
                { test: /\.png$/, loader: "url?mimetype=image/png" },
                {
                    test: /(\.jsx?$)|(\.tsx?)/,
                    exclude: /node_modules/,
                    loaders: [
                        'babel-loader',
                    ]
                },
                {
                    test: /\.vue$/,
                    loaders: [
                        'babel-loader',
                        'vue-loader'
                    ]
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new webpack.ProvidePlugin({
                TYPES: ROOT_PATH + '/app/constant.js'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('dev')
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '..', '/views/main.pug'),
                minify: false
            })
        ]
    },
    {
        // The configuration for the server-side
        name: "server-side",
        entry: "./index.js",
        target: "node",
        output: {
            path: ROOT_PATH,
            filename: "index.bundle.js",
            libraryTarget: "commonjs2"
        },
        node: {
            __dirname: false
        },
        externals: /^[a-z\-0-9]+$/,
        module: {
        }
    }
];