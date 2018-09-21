import { load } from './polyfills/load';

import React from 'react';
import ReactDOM from 'react-dom';

load()
.then(() => {
    const App = require('@app/app').default;

    ReactDOM.render(<App />, document.getElementById('root'));
});
