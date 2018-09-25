import './app.css';

import React from 'react';
import { idxf3 } from '@utils';
import { Page } from './page/index';

export interface IAppProps {
    options?: {
        config?: {
            data: string
        },
    }

    title?: string
}

export const App = (props: IAppProps) => {

    const text = 'Test React App !';

    const data = idxf3(
        props,
        (props) => props.options,
        (options) => options!.config,
        (config) => config!.data);

    return (
        <>
            <div>{props.title || text} {data}</div>
            <div>
                <Page />
            </div>
        </>
    );
};

export default App;
