# Async - Await

### [Back to root](/README.md)

## Dependencies

Add dependencies to `package.json`

```json
"devDependencies": {
...
"@babel/plugin-transform-runtime": "7.1.0",
"@babel/runtime": "7.0.0"
...
}
```

## Configure babel

Add plugins to `.babelrc`

```json
...
["@babel/plugin-transform-runtime", {
    "corejs": false,
    "regenerator": true
}]
...
```

Add IE11 support to babel

```json
...
["@babel/env", {
    "modules": false,
    "targets": {
        "ie": "11"
    }
}]
...
```
