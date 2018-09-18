import path from 'path';
import webpack, { Options } from 'webpack';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const aliases = require('./webpack/module-aliases').getAliases;

const Environments = (() => {
    enum Values {
        Prod = 'production',
        Analysis = 'analyse'
    }

    return {
        get isProduction(): boolean {
            return process.env.NODE_ENV === Values.Prod;
        },

        get isAnalysis(): boolean {
            return process.env.NODE_ENV === Values.Analysis;
        },

        get current(): string {
            return process.env.NODE_ENV;
        }
    };
})();

const Parts = {
    production: {
        optimization: {
            minimize: true,
        } as Options.Optimization,

        // add this to config for prod source maps
        // remove react-hot-loader from .babelrc
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

console.log(`Running webpack config for environment: ${Environments.current}`);

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

    ...Environments.isAnalysis && { devtool: Parts.analysis.devtool },

    output: {
        path: Paths.destination,
        filename: '[name].bundle.[contenthash:8].js',
        publicPath: '/dist/'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: aliases(Paths.source)
    },

    module: {
        rules: [{
            // Include ts, tsx, and js files.
            test: /\.(tsx?)|(js?)$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            options: {
                cacheDirectory: true    // react-hot-loader needs this
            }
        }],
    },

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),

        new webpack.HashedModuleIdsPlugin(),

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
    ].concat(Environments.isAnalysis ? Parts.analysis.plugins : []),

    node: {
        fs: 'empty'
    },

    optimization: {

        ...Environments.isProduction ? Parts.production.optimization : Parts.analysis.optimization,

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

                        if (packageName === 'react-hot-loader') {
                            return undefined;   // exclude react-hot-loader from bundling
                        }

                        return `npm.${packageName.replace('@', '')}`;
                    }
                }
            }
        }
    }
};

export default config;
