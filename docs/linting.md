## TSLint

# Add tslin

Add dependencies to `package.json`

```json
"devDependencies": {
    ...
    "tslint": "5.11.0",
    "tslint-config-airbnb": "5.11.0",
    "tslint-react": "3.6.0"
    ...
}
```

# TSLint config

Create `tslint.json` config file

```bash
npx -c "tslint -i"
```

Add `tslint.json` content

```json
{
    "$schema": "http://json.schemastore.org/tslint",
    "defaultSeverity": "error",
    "extends": [
        "tslint-react","tslint-config-airbnb"
    ],
    "linterOptions": {
        "exclude": ["node_modules/**/*.*"]
    },
    "rules": {
        "import-name": false,
        "eofline": false,
        "indent": [true, "spaces", 4],
        "ter-indent": [true, 4],
        "ter-arrow-parens": false,
        "trailing-comma": [false, {"multiline": "always", "singleline": "never"}],
        "semicolon": [true, "always", "ignore-interfaces"],
        "variable-name": [true, "allow-pascal-case"],
        "jsx-alignment": true,
        "jsx-curly-spacing": false,
        "jsx-boolean-value": "never"
    }
}
```

Add script entry to `package.json`

```json
"scripts": {
...
"lint": "tslint -c tslint.json -p tsconfig.json",
...
}
```

# Editor config

Add `.editorconfig` file

```bash
touch .editorconfig
```

Change `.editorconfig` contents

```text
# top-most EditorConfig file
root = true

[*]
charset = utf-8
end_of_line = crlf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 4

```
