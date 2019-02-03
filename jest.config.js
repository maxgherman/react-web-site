
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
        "<rootDir>/src/**/?(*.)+(spec|test).(t|j)s?(x)"
    ],

    globals: {
        "ts-jest": {
            "tsConfig": "tsconfig.json"
        }
    }
};
