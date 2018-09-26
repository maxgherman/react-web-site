# Jest

### [Back to root](/README.md)

## Dependencies

Add dependencies to `package.json`

```json
 "devDependencies": {
...
    "@types/jest": "23.3.2",
    "@types/react-test-renderer": "16.0.2",
    "jest": "23.6.0",
    "react-test-renderer": "16.5.2",
    "ts-jest": "23.10.1"
 ...
 }
```

Add `test` entry to `scripts` section under `package.json`

```json
"scripts": {
...
    "test": "jest"
..
}
```

## Configure Jest

Create `jest.config.js` under root

```bash
touch jest.config.js
```

Add content to `jest.config.js`

```js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    moduleFileExtensions: [
        "ts",
        "tsx",
        "js"
    ],

    moduleNameMapper: {
        "\\.css$": "<rootDir>/__mocks__/styleMock.js"
    },

    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },

    testMatch: [
    "**/__tests__/**/*.(t|j)s?(x)",
    "**/?(*.)+(spec|test).(t|j)s?(x)"
    ],

    globals: {
        "ts-jest": {
            "tsConfig": "tsconfig.json"
        }
    }
};
```

Create `__mocks__` folder under root

Create `styleMock.js` under `__mocks__`

```bash
mkdir __mocks__
touch __mocks__/styleMock.js
```

Add content to `styleMock.js`

```js
module.exports = {};
```

## Basic test

Create `index.test.tsx` file under src/app/page

```bash
touch src/app/page/index.test.tsx
```

Add content to `index.test.tsx`

```tsx
import React from 'react';
import renderer from 'react-test-renderer';
import { Page } from '.';

describe('<Page /> component', () => {

    it('should render root element', () => {

        const component = renderer.create(<Page />);
        const instance = component.root;

        expect(instance.findByProps({ className: 'page' }).type).toBe('div');

        // component.toJSON()  to serialize to JSON
    });
});
```
