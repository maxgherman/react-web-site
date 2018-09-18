# React HOT Loader

## Add dependency

Add `react-hot-loader` to `package.json`

```json
"devDependencies": {
    ...
    "react-hot-loader": "4.3.7"
    ...
}
```

## Configure Babel

Add entry into `.babelrc`

```json
"plugins": [
    ... 
    "react-hot-loader/babel"
]
```
## Configure App

Create `index-dev.tsx` under `src` folder

Create `app-dev.tsx` under `src` folder

```bash
touch src/index-dev.tsx
touch src/app-dev.tsx
```

Add content to `index-dev.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app-dev';

ReactDOM.render(<App />, document.getElementById('root'));

//@ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}
```

Add content to `app-dev.tsx`

```tsx
import { hot } from 'react-hot-loader';
import App from '@app/app';

export default hot(module)(App);
```

Change `index.tsx` to import default App instance

```tsx
import App from '@app/app';
```

## Configure Webpack

Add `cacheDirectory` option to `babel-loader`

```json
...
rules: [{
    // Include ts, tsx, and js files.
    test: /\.(tsx?)|(js?)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        cacheDirectory: true    // react-hot-loader needs this
    }
}]
...
```

Add entry point for `development` environment

```ts
...
entry: {
    main: [
        'react-hot-loader/patch',               // makes sure react-hot-loader is loaded first
        path.join(__dirname, 'src', 'index-dev')
    ]
} as Entry
...
```