# Babel Typescript

## Create npm package skeleton

```sh
npm init -y
```

## Add Babel-Typescript dependencies

```json
"devDependencies": {
    "@babel/cli": "7.0.0",
    "@babel/core": "7.0.0",
    "@babel/plugin-proposal-class-properties": "7.0.0",
    "@babel/plugin-proposal-object-rest-spread": "7.0.0",
    "@babel/preset-env": "7.0.0",
    "@babel/preset-typescript": "7.0.0",
    "typescript": "3.0.3"
}
```

## Create your `tsconfig.json`

Then run

```sh
tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir lib
```

## Create your `.babelrc`

Then copy the content from below:

```json
{
    "presets": [
        ["@babel/env", {
            "modules": false
        }],
        "@babel/typescript"
    ],
    "plugins": [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ]
}
```
## Set up build tasks

Add the following to the `"scripts"` section of `package.json`

```json
"scripts": {
    "type-check": "tsc --noEmit",
    "type-check-watch": "npm run type-check -- --watch", 
    "build": "npm run build-types && npm run build-js",
    "build-types": "tsc --emitDeclarationOnly",
    "build-js": "babel src --out-dir lib --extensions \".ts,.tsx\" --source-maps inline"
}
```