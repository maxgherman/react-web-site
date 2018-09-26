# CSS

### [Back to root](/README.md)

## Dependencies

Add dependencies to `package.json`

```json
 "devDependencies": {
...
    "css-loader": "1.0.0",
    "cssnano": "4.1.3",
    "mini-css-extract-plugin": "0.4.3",
    "postcss-cssnext": "3.1.0",
    "postcss-loader": "3.0.0",
    "style-loader": "0.23.0",
...
}
```

## Configure Webpack

Add `css` rule to `development` webpack config

```ts
...
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader']
}
...
```

Add `css` extraction plugin to `production` webpack config

```ts
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

...

plugins: [
    ...

    new MiniCssExtractPlugin({
        // both options are optional
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[id].[contenthash:8].css',
    })

     ...
    ]

```

Add `css` rule to `production` webpack config

```ts
...
{
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
}
...
```

## Configure Postcss

Create `postcss.config.js` file under root

```bash
touch postcss.config.js
```

Add content to `postcss.config.js`

```js
const cssnext = require("postcss-cssnext");
const cssnano = require('cssnano');

const Environments = (env) => {
    Values = {
        Prod: 'production',
    };

    return {
        get isProduction() {
            return env === Values.Prod;
        },

        get current() {
            return env;
        }
    };
}

const basePlugins = [
    cssnext({
        browsers: 'last 2 version, IE 11, not IE 10'
    })
];

const prodPlugins = [
    cssnano({
        preset: 'default'
    })
];

module.exports = function(ctx) {

    const environments = Environments(ctx.env);

    return {
        plugins: basePlugins.concat(environments.isProduction ? prodPlugins : [])
    };
}
```
