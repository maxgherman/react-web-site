const Environments = require('./webpack/environments');

const developmentPlugins = [
    ["babel-plugin-webpack-alias", {
        "config": "webpack.config.dev.js",
        "findConfig": true
    }],
    "react-hot-loader/babel"
];

const productionPlugins = [
    ["babel-plugin-webpack-alias", {
        "config": "webpack.config.js",
        "findConfig": true
    }]
];


module.exports = api => {
    
    const environments = Environments(api.env());
    
    api.cache(true);
    
    return {
        presets: [
            ["@babel/env", {
                "modules": false,
                "targets": {
                    "ie": "11"
                  }
            }],
            "@babel/typescript",
            "@babel/preset-react"
        ],

        plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-syntax-dynamic-import",
            
            ["@babel/plugin-transform-runtime", {
                "corejs": false,
                "regenerator": true
            }],
        ]
        .concat(environments.isDevelopment ? developmentPlugins : [])
        .concat(environments.isProduction ? productionPlugins : [])
    }
  }