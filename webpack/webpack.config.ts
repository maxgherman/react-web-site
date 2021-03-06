import path from 'path';
import webpack, { Options } from 'webpack';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const Parts = {
    production: {
        optimization: {
            minimize: true,
        } as Options.Optimization,

        // add this to config for prod source maps
        mapFileControlOption:
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].js.map',
                lineToLine: true
            })
    },

    analysis: {
        devtool: 'source-map' as Options.Devtool,

        optimization: {
            minimize: false,
        } as Options.Optimization,

        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: '../../webpack/bundle-report.html'
            })
        ] as webpack.Plugin[]
    }
};

const isAnalysis = (process.env.ANALYSE || '').toUpperCase() === 'TRUE';

console.log(`Running webpack config for environment: ${process.env.NODE_ENV}`);

const Paths = {
    indexJs: path.join(__dirname, 'src', 'index'),
    source: path.join(__dirname, 'src'),
    destination: path.resolve(__dirname, 'www', 'dist'),
    contentBase: path.join(__dirname, 'www')
};

const config: webpack.Configuration = {
    mode: 'production',

    entry:  {
        main: Paths.indexJs
    },

    ...isAnalysis && { devtool: Parts.analysis.devtool },

    output: {
        path: Paths.destination,
        filename: '[name].bundle.[contenthash:8].js',
        publicPath: '/dist/'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [{
            // Include ts, tsx, and js files.
            test: /\.(tsx?)|(jsx?)$/,
            include: [
                Paths.source,
                path.resolve(__dirname, 'node_modules/ky')
            ],
            loader: 'babel-loader',
            options: {
                cacheDirectory: true    // react-hot-loader needs this
            }
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        }],
    },

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),

        new webpack.HashedModuleIdsPlugin(),

        new MiniCssExtractPlugin({
            // both options are optional
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].[contenthash:8].css',
        }),

        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './webpack/template.index.html',
            chunksSortMode: 'dependency',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),

        new CleanWebpackPlugin(
            [Paths.destination],
            { verbose: true })
    ]
    .concat(isAnalysis ? Parts.analysis.plugins : []),

    node: {
        fs: 'empty'
    },

    optimization: {

        ...isAnalysis ? Parts.analysis.optimization : Parts.production.optimization,

        removeAvailableModules: true,

        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    name(module) {
                        const packageName =
                            module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        return `npm.${packageName.replace('@', '')}`;
                    }
                }
            }
        }
    }
};

export default config;
