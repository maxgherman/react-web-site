
module.exports = api => {
    
    api.cache(true);
    
    return {
        ignore: [
            '**/*.test.ts',
            '**/*.test.tsx'
        ],

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

            [require.resolve('babel-plugin-module-resolver'), {
                root: ["."],
                alias: {
                    "@app": "./src/app",
                    "@utils": "./src/utils"
                }
            }],
            
            ["@babel/plugin-transform-runtime", {
                "corejs": false,
                "regenerator": true
            }],
        ]
    }
  }