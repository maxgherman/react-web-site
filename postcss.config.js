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
        plugins: [ cssnext ]
        .concat(environments.isProduction ? prodPlugins : [])
    };
}
