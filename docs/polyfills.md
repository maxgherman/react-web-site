# Polyfills

### [Back to root](/README.md)

## Dependencies

Add dependencies to `package.json`

```json
 "dependencies": {
...
    "core-js": "2.5.7",
    "intl": "1.2.5",
    "es6-promise": "4.2.5",
    "url-polyfill": "1.1.0",
    "whatwg-fetch": "3.0.0"
 ...
 }
```

## Crete polyfills structure

Create `polyfills` folder under `src`

Create `polyfills` file under `polyfills` folder

Create `load` file under `polyfills` folder

```bash
mkdir src/polyfills
touch src/polyfills/polyfills.ts
touch src/polyfills/load.ts
```

## Load polyfills

Add content to `polyfills.ts`

```ts
require('core-js/web/dom-collections');
require('core-js/es6/object');
require('core-js/es7/object');
require('core-js/es6/symbol');
require('core-js/es6/array');
require('core-js/es7/array');
require('core-js/es6/string');
require('core-js/es7/string');
require('core-js/es6/map');
require('core-js/es6/date');

require('whatwg-fetch');
require('intl');
require('url-polyfill');

export { };
```

Add content to `load.ts`

```ts
require('es6-promise').polyfill();

export const getPresence = () => {
    const result = [];

    'fetch' in window || result.push('fetch');
    'assign' in Object || result.push('assign');
    'entries' in Object || result.push('entries');
    'keys' in Object || result.push('keys');
    'forEach' in Array.prototype || result.push('forEach'),
    'includes' in Array.prototype || result.push('Array.includes'),
    'URL' in window || result.push('URL'),
    'Map' in window || result.push('Map'),
    'Intl' in window || result.push('Intl'),
    'startsWith' in String.prototype || result.push('startsWith'),
    'endsWith' in String.prototype || result.push('endsWith'),
    'includes' in String.prototype || result.push('String.includes');

    return result;
};

export const load = () => {
    return new Promise((resolve) => {
        const presence = getPresence();

        if (presence.length <= 0) {
            resolve();
            return;
        }

        import('./polyfills')
        .then(resolve);
    });
};
```

Import polyfills from `index.ts`

```ts
import { load } from './polyfills/load';

import React from 'react';
import ReactDOM from 'react-dom';

load()
.then(() => {
    const App = require('@app/app').default;

    ReactDOM.render(<App />, document.getElementById('root'));
});
```

Import polyfills from `index-dev.ts`

```ts
import { load, getPresence } from './polyfills/load';

import React from 'react';
import ReactDOM from 'react-dom';

load()
.then(() => {
    require('react-hot-loader/patch');

    const polyfillPresence = getPresence();

    const App = polyfillPresence.length <= 0 ?
        require('./app-dev').default :
        () => (
            <div>
                Missing polyfills for:<br/>
                {polyfillPresence.map((item, index) => <> <br/> <span key={index}>{item}</span></>)}
            </div>
        );

    ReactDOM.render(<App />, document.getElementById('root'));
});

...
```

