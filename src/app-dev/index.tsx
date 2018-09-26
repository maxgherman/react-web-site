import { load, getPresence } from '../polyfills/load';

import React from 'react';
import ReactDOM from 'react-dom';

load()
.then(() => {
    require('react-hot-loader/patch');

    const polyfillPresence = getPresence();

    const App = polyfillPresence.length <= 0 ?
        require('./app').default :
        () => (
            <div>
                Missing polyfills for:<br/>
                {polyfillPresence.map((item, index) => <> <br/> <span key={index}>{item}</span></>)}
            </div>
        );

    ReactDOM.render(<App />, document.getElementById('root'));
});

// @ts-ignore
if (module.hot) {

    // @ts-ignore
    module.hot.accept();
}
