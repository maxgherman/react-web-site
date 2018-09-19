# Bundle split, Lazy load

### [Back to root](/README.md)

## Production vendor split

Change `optimization` section of production `webpack.config.ts` file:

```ts
optimization: {
    minimize: true,
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

                    if(packageName === 'react-hot-loader') {
                        return undefined;   // exclude react-hot-loader from bundling
                    }

                    return `npm.${packageName.replace('@', '')}`;
                }
            }
        }
    }
}
```

## Lazy load bundles

Add `react-loadable` to `package.json`

```json
"dependencies": {
    ...
    "react-loadable": "5.5.0"
    ...
  },
  "devDependencies": {
  ...
  "@types/react-loadable": "5.4.1"
  ...
  }
```

Change 'Page' component to use `react-loadable`

```tsx
import React from 'react';
import Loadable from 'react-loadable';

interface IPageState {
    test: number,
    view?: JSX.Element
}

const LoadableComponent = Loadable({
    loader: () => import('./counter'),
    loading() {
        return (<div>Loading...</div>);
    }
});

export class Page extends React.Component<{}, IPageState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            test: 100,
            view: undefined
        }
    }

    public render() {
        return (
            <div>
                <p>
                    Click the button to load Counter from bundle !
                </p>
                <p>{this.state.test}</p>
                <p>
                    <button onClick={() => this.setState((prev) => ({ test: prev.test +1 })) }>Increase</button>
                    <br />
                    <br />
                    <button onClick={() => this.setState(() => ({ view: (<LoadableComponent />) })) }>Load View</button>
                </p>
            {this.state.view}
            </div>
        );
    }
}
```
