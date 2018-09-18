# Code splitting

## Babel dependency

Add `dynamic import` to `package.json`

```json
"devDependencies": {
...
    "@babel/plugin-syntax-dynamic-import": "7.0.0"
...
}
```

## Create Page structure

Create folder `page` under `app` folder

Create `index.tsx` under `page` folder 

Create `counter.tsx` under `page` folder

```sh
cd src/app
mkdir page
touch page/index.tsx
touch page/counter.tsx
```

Add `Page` component to `index.tsx`

```tsx
import React from 'react';

interface IPageState {
    view?: JSX.Element    
}

export class Page extends React.Component<{}, IPageState> {
    
    constructor(props: {}) {
        super(props);

        this.state = {
            view: undefined
        }
    }

    public render() {
        return (
            <div>
                <p>
                    Click the button to load Counter from bundle
                </p>
                <p>
                    <button onClick={this.addCounterView}>Load</button>
                </p>
                <p>{this.state.view}</p>
            </div>
        );
    }

    private addCounterView = (): void => {
        import('./counter')
            .then(module => {
                
                //@ts-ignore
                const Component = module.default;
                
                this.setState({
                    view: <Component />
                });
            })
        .catch(console.error);
    };
}
```

## Create Counter component

Add `Counter` component to `counter.tsx`

```tsx
import React from 'react';

interface ICounterState {
    count: number    
}

class Counter extends React.Component<{}, ICounterState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            count : 10
        };
    }

    public render() {
        return (
            <>
              <p>
              Counter: {this.state.count}
              </p>
              <p>
                <button onClick={this.increase}>+</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.decrease}>-</button>
              </p>  
            </>
        );
    }

    private increase = () => {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    }

    private decrease = () => {
        this.setState((prevState) => ({
            count: prevState.count - 1
        }));
    }
}

export default Counter;
```

## Alter App component


Change `app.tsx` to import `Page` component

```tsx
...
import { Page } from './page/index';

...

<div>
    <Page />
</div>
```