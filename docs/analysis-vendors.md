# Vendors split, bundle analysis

### [Back to root](/README.md)

## Add optimization section to Webpack

Add optimization section to `webpack.config.ts`

```ts
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
}
```

For production environment add following params to it

```ts
optimization: {
    ...
    minimize: true,
    removeAvailableModules: true
    ...
}
```

## Add bundle-buddy

Add dependency to `package.json`

```json
"devDependencies": {
    ...
    "bundle-buddy": "0.2.1"
    ...
}
```

Set webpack `devtool` option to `source-map` for analysis env
Set webpack `devtool` option to `cheap-module-eval-source-map` for development env

```ts
devtool: 'source-map' as Options.Devtool
devtool: 'cheap-module-eval-source-map' as Options.Devtool
```

Add
```json
"analyse": "npm run build:config && cross-env NODE_ENV=analyse webpack && npm run analyse-bundle",
```

to `scripts` section of `package.json`
