# Basic React Webpack

## Add React dependencies

``` json
"dependencies": {
    "react": "16.5.0",
    "react-dom": "16.5.0"
},
"devDependencies": {
    "@types/react": "16.4.13",
    "@types/react-dom": "16.0.7",
    "@babel/preset-react": "7.0.0"
}
```

## Add react preset to .babelrc

```json
"presets": [
    ...
    "@babel/preset-react"
]
```

## Add Webpack dependencies

> `"webpack-command"` could be used instead of webpack-cli

```json
"devDependencies": {
    "webpack": "4.17.2",
    "webpack-cli": "3.1.0",
    "webpack-dev-server": "3.1.8"
  }
```

## Create a `webpack.config.js`

Create a `webpack.config.js` at the root of this project with the following contents:

```js
var path = require('path');

var contentBase = 'www';
var destinationPath = path.resolve(__dirname, contentBase, 'dist');

module.exports = {
    entry: './src/index',
    output: {
        path: destinationPath,
        filename: 'app.bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            // Include ts, tsx, and js files.
            test: /\.(tsx?)|(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        contentBase: path.join(__dirname, contentBase)
    }
};
```

## Create www folder under root

```sh
mkdir www
```

## Create source

Create `src` folder under root

Create `app` folder under `src`

Create `index.tsx` under `src`

Create `app.tsx` under `app`

```sh
mkdir src
mkdir src/app
touch src/index.tsx
touch src/app.app.tsx
```

Copy content to `index.tsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@app/app';

ReactDOM.render(<App/>, document.getElementById('root'));

```

Copy content to app.tsx

```jsx
import React from 'react';

export interface IAppProps {
    title?: string;
}

export const App = (props: IAppProps) => {
    const text = 'Test React App !';
    return (<div>{props.title || text}</div>)
}
```

## Configure Webpack aliases

Add babel plugin dependency

```json
"devDependencies": {
...
"babel-plugin-webpack-alias": "2.1.2"
...
}
```


Add webpack.config.js entry

```js
    resolve: {
        ...
        alias: {
            '@app': path.join(__dirname, 'src', 'app'),
        }
    } 
```

Add tsconfig.json entry

```json
...
"baseUrl": "./",                          /* Base directory to resolve non-absolute module names. */
"paths": {                                /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    "@app/*": ["./src/app/*"],
}
...  
```

## Create bundle/dev tasks

Add

```json
"bundle": "webpack --mode=production",
"start:dev": "webpack-dev-server --mode=development --open --hot"
```

to the `scripts` section in your `package.json`