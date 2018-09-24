import React from 'react';
import ky from 'ky';

interface IDataPayload {
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

interface ICounterState {
    count: number
    data: IDataPayload[]
}

class Counter extends React.Component<{}, ICounterState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            count : 10,
            data: []
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
                <button onClick={this.decrease}>-</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.calcLongClick}>Calc long count</button>
              </p>
              <div>
                  <button onClick={this.loadData}>Load Data</button>
                  {this.renderDataList()}
              </div>
            </>
        );
    }

    private renderDataList() {
        return (
            <ul>
                {this.state.data.map(this.renderListItem)}
            </ul>
        );
    }

    private renderListItem(item: IDataPayload) {
        return (
            <li key={item.id}>
                {item.title}<br/>
                <img src={item.thumbnailUrl} />
            </li>
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

    private calcLongClick = async () => {
        const result = await new Promise<number>(
            (resolve) => {
                setTimeout(() => {
                    resolve(this.state.count);
                },
                           500);
            });

        this.setState((prevState) => ({
            count: prevState.count + result
        }));
    }

    private loadData = async () => {
        const result = await ky.get('https://jsonplaceholder.typicode.com/photos')
            .json() as IDataPayload[];

        this.setState(() => ({
            data: result.slice(0, 10)
        }));
    }
}

export default Counter;
