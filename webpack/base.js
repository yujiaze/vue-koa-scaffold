const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.join(__dirname, '..');
const BUILD_PATH = path.join(__dirname, '..', '/build');
var NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

require('shelljs/global');

module.exports = function (PUBLIC_PATH) {
    return [
        {
            // The configuration for the client
            name: "browser",
            entry: [
                "babel-polyfill",
                "./app/app.js"
            ],
            output: {
                path: BUILD_PATH,
                filename: "index.bundle.js",
                publicPath: PUBLIC_PATH
            },
            devtool: 'source-map',
            module: {
                rules: [
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
                        test: /\.s?css$/,
                        loaders: [
                            'style-loader',
                            'css-loader?modules&importLoaders=1',
                            'postcss-loader?sourceMap=inline'
                        ]
                    },
                    {
                        test: /\.pug$/,
                        loader: 'pug-loader'
                    },
                    {
                        test: /\.vue$/,
                        use: [
                            {
                                loader: 'babel-loader'
                            },
                            {
                                loader: 'vue-loader',
                                options: {
                                    postcss: {
                                        plugins: [
                                            require('autoprefixer')({
                                                browsers: ['last 2 versions']
                                            }),
                                            require('precss')
                                        ],
                                        options: {
                                            parser: require('postcss-scss')
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.vue']
            },
            plugins: [
                new webpack.ProvidePlugin({
                    TYPES: ROOT_PATH + '/app/constant.js'
                }),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
                }),
                new webpack.LoaderOptionsPlugin({
                    options: {
                        postcss: {
                            parser: require('postcss-scss'),
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 2 versions']
                                }),
                                require('precss')
                            ]
                        }
                    }
                }),
                new webpack.DllReferencePlugin({
                    context: __dirname,
                    manifest: require('../build/dll/vendor.manifest.json')
                })
            ]
        },
        {
            // The configuration for the server-side
            name: "server-side",
            entry: [
                "babel-polyfill",
                "./index.js"
            ],
            target: "node",
            output: {
                path: ROOT_PATH + '/bin',
                filename: "www",
                libraryTarget: "commonjs2"
            },
            node: {
                __dirname: false
            },
            externals: /^[a-z\-0-9]+$/,
            module: {
                rules: [
                    {
                        test: /(\.jsx?$)|(\.tsx?)/,
                        exclude: /node_modules/,
                        loaders: [
                            'babel-loader'
                        ]
                    }
                ]
            }
        }
    ];
}