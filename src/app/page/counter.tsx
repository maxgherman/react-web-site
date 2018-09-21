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
                Counter : {this.state.count}
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
