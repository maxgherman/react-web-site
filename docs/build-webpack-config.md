# Converting Webpack config to Typescript

## Add typescript dependencies

```json
"devDependencies": {
    ...
    "@types/webpack": "4.4.11"
    ...
}
```

## Convert js to ts

Create `webpack` folder under root

Create `webpack.config.ts` under `webpack`

Create `tsconfig-webpack.json` under `webpack`

```sh
mkdir webpack
touch webpack/webpack.config.ts
touch webpack/tsconfig-webpack.json
```

Copy webpack.config.js file into `webpack/webpack.config.ts` and convert it to typescript

Copy content to `webpack/tsconfig-webpack.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "esModuleInterop": true,
    "outDir": "../",
  },
  "include": [
    "webpack.config.ts"
  ],
  "exclude": [
      "../node_modules"
  ]
}
```

## Create build task

Add

```json
"build:config": "tsc -p webpack/tsconfig-webpack.json",
```

to the `scripts` section in your `package.json`