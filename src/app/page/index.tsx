import React from 'react';
import Loadable from 'react-loadable';

interface IPageState {
    test: number
    view?: JSX.Element
}

const LoadableComponent = Loadable({
    loader: () => import('./counter'),
    loading() {
        return <div>Loading...</div>;
    }
});

export class Page extends React.Component<{}, IPageState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            test: 100,
            view: undefined
        };
    }

    public render() {
        return (
            <div>
                <p>
                    Click the button to load Counter from bundle !
                </p>
                <p>{this.state.test}</p>
                <p>
                    <button onClick={this.increase}>Increase</button>
                    <br />
                    <br />
                    <button onClick={this.loadView}>Load View</button>
                </p>
            {this.state.view}
            </div>
        );
    }

    private increase = () => {
        this.setState((prev) => ({ test: prev.test + 1 }));
    }

    private loadView = () => {
        this.setState(() => ({ view: (<LoadableComponent />) }));
    }
}
