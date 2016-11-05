var path = require('path'),
    webpack = require('webpack'),
    env = process.env.NODE_ENV;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log(env);
console.log('==================================================华丽丽的分割线=============================================');

// 开发环境配置
// --------------------------------------------------------------------------------------------
var config_dev = {
    entry: {
        index: [
            'webpack/hot/dev-server',
            path.resolve(__dirname, 'src/react/entry.js')
        ],
        // lib: [
        //     path.resolve(__dirname, 'node_modules/iscroll/build/iscroll-probe.js')
        // ],
        vendors: [
            'react',
            'react-dom',
            path.resolve(__dirname, 'node_modules/iscroll/build/iscroll-probe.js'),
            // path.resolve(__dirname, 'src/scripts/qrcode.min.js')
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    resolve: {
        root: '/src',
        extensions: ['', '.js', '.jsx', '.json', '.less'],
        alias: {
            'pages': './pages',
            'images': path.resolve(__dirname, 'src/images'),
            'iscroll': path.resolve(__dirname, 'node_modules/iscroll/build/iscroll-probe.js')
        }
    },
    devtool: 'eval',
    module: {
        preLoaders: [{
            // eslint loader
            test: /\.(js|jsx)$/,
            loader: 'eslint-loader',
            include: [path.resolve(__dirname, 'src')],
            exclude: [path.resolve(__dirname, 'node_modules')]
        }],
        loaders: [
            // {
            //     test: require.resolve('./src/scripts/qrcode.min.js'),
            //     loader: "expose?QRCode"
            // },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader?sourceMap']
            }, {
                test: /\.less$/,
                // toFix: css-loader 的sourcemap导致less文件中background的url属性应用的图片不显示，暂时不知道原因
                loaders: ['style-loader', 'css-loader', 'less-loader?sourceMap']
            }, {
                test: /\.(jpg|jpeg|png|gif|)$/i,
                loaders: ['url-loader?limit=15000&name=images/[name].[ext]']
            }, {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [path.resolve(__dirname, 'node_modules')]
            }, {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000'
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
        new webpack.ProvidePlugin({
            IScroll: 'iscroll'
        })
    ],
    devServer: {
        hot: true,
        inline: true,
        // proxy: {
        //   '/*': {
        //       target: 'http://localhost:3000/',
        //       secure: false
        //   }
        // }
    }
};

// 生产环境配置
// ---------------------------------------------------------------------------------------------------
var config_production = {
    entry: {
        index: [
            path.resolve(__dirname, 'src/react/entry.js')
        ],
        // lib: [
        //     path.resolve(__dirname, 'node_modules/iscroll/build/iscroll-probe.js')
        // ],
        vendors: ['react', 'react-dom', path.resolve(__dirname, 'node_modules/iscroll/build/iscroll-probe.js')]
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    resolve: {
        root: '/src',
        extensions: ['', '.js', '.jsx', '.json', '.less'],
        alias: {
            'pages': './pages',
            'images': path.resolve(__dirname, 'src/images'),
            'iscroll': path.resolve(__dirname, 'node_modules/iscroll/build/iscroll-probe.js')
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'less-loader'])
        }, {
            test: /\.(jpg|jpeg|png|gif|)$/i,
            loaders: ['url-loader?limit=15000&name=images/[name].[ext]']
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: [path.resolve(__dirname, 'node_modules')],
        }, {
            test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000'
        }]
    },
    // devtool: 'cheap-module-source-map',
    plugins: [
        new ExtractTextPlugin('css/style.css', {
            allChunk: true
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            IScroll: 'iscroll'
        })
    ]
};

module.exports = (env === 'production') ? config_production : config_dev;
