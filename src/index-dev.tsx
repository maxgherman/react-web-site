import './polyfills';
import 'react-hot-loader/patch';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app-dev';

ReactDOM.render(<App />, document.getElementById('root'));

// @ts-ignore
if (module.hot) {

    // @ts-ignore
    module.hot.accept();
}
