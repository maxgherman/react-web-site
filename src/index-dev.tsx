import { load } from './polyfills/load';

import React from 'react';
import ReactDOM from 'react-dom';

load()
.then(() => {
    require('react-hot-loader/patch');

    const App = require('./app-dev').default;

    ReactDOM.render(<App />, document.getElementById('root'));
});

// @ts-ignore
if (module.hot) {

    // @ts-ignore
    module.hot.accept();
}
