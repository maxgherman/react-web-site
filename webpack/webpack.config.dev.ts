import path from 'path';
import webpack from 'webpack';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const aliases = require('./webpack/module-aliases').getAliases;

interface IConfig extends webpack.Configuration {
    devServer: {
        contentBase: string
        overlay: boolean
    }
}

console.log(`Running webpack config for environment: ${process.env.NODE_ENV}`);

const Paths = {
    indexJs: path.join(__dirname, 'src', 'index-dev'),
    source: path.join(__dirname, 'src'),
    destination: path.resolve(__dirname, 'www', 'dist'),
    contentBase: path.join(__dirname, 'www')
};

const config: IConfig = {
    mode: 'development',

    entry: {
        main: [
            Paths.indexJs
        ]
    },

    devtool: 'cheap-module-eval-source-map',

    output: {
        path: Paths.destination,
        filename: '[name].bundle.js',
        publicPath: 'dist/'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: aliases(Paths.source)
    },

    module: {
        rules: [{
            // Include ts, tsx, and js files.
            test: /\.(tsx?)|(js?)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true    // react-hot-loader needs this
            }
        }],
    },

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.NamedModulesPlugin(),

        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './webpack/template.index.html',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),

        new CleanWebpackPlugin(
            [Paths.destination],
            { verbose: true })
    ],

    node: {
        fs: 'empty'
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: 'vendors'
        }
    },

    devServer: {
        contentBase: Paths.contentBase,
        overlay: true,
    }
};

export default config;
