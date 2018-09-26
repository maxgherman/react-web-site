const cssnext = require("postcss-cssnext");
const cssnano = require('cssnano');
const Environments = require('./webpack/environments');

const prodPlugins = [
    cssnano({
        preset: 'default'
    })
];

module.exports = function(ctx) {

    const environments = Environments(ctx.env);

    return {
        plugins: [
            cssnext({
                browsers: 'last 2 version, IE 11, not IE 10'
            })
        ]
        .concat(environments.isProduction ? prodPlugins : [])
    };
}
