# Cache busting

### [Back to root](/README.md)

# Configure Webpack

Add `contenthash` option to `output` section of production `webpack.config.ts` file

```ts
...
output: {
    path: Paths.destination,
    filename: '[name].bundle.[contenthash:8].js',
    publicPath: '/dist/'
}
...
```
# Delete index.html

Remove index.html

```bash
git rm www/index.html
```

Add entry to `.gitignore` file

```text
www/index.html
```

# Add Webpack html generation dependencies

Add html webpack plugins to `package.json`

```json
"devDependencies": {
...
"html-webpack-plugin": "3.2.0",
"html-webpack-harddisk-plugin": "0.2.0"
...
}
``

Create `template.index.html` under `webpack` folder

```bash
touch webpack/template.index.html
```

Add content to `webpack/template.index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title>Test</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## Configure Webpack

Add plugins to webpack dev and production environments

```ts
plugins: [
...
new HtmlWebpackPlugin({
    filename: '../index.html',
    template: './webpack/template.index.html',
    chunksSortMode: 'dependency',
    alwaysWriteToDisk: true
}),
new HtmlWebpackHarddiskPlugin()
...
```

Change `publicPath` in webpack dev environment (no leading slash)

```ts
output: {
    path: Paths.destination,
    filename: '[name].bundle.js',
    publicPath: 'dist/'
},
```
