# Environments set up

### [Back to root](/README.md)

## Cross OS  support

Add `cross-env` dependency to `package.json`

```json
"devDependencies": {
    "cross-env": "5.2.0"
}
```

## Webpack config

Add environments to `webpack.config.ts`

```ts
enum Values {
    Prod = 'production',
    Dev = 'development',
    Analysis = 'analyse'
}
```

## Scripts config

Add environments set up before every entry under `script` section in `package.json` if needed

```json
"start:dev": "npm run build:config && cross-env NODE_ENV=development ...",
"bundle": "npm run build:config && cross-env NODE_ENV=production ...",
"analyse": "npm run build:config && cross-env NODE_ENV=analyse ...",
```
