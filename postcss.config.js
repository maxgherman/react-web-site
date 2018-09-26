const cssnext = require("postcss-cssnext");
const cssnano = require('cssnano');

const Environments = (env) => {
    Values = {
        Prod: 'production',
    };

    return {
        get isProduction() {
            return env === Values.Prod;
        },

        get current() {
            return env;
        }
    };
}

const basePlugins = [
    cssnext({
        browsers: 'last 2 version, IE 11, not IE 10'
    })
];

const prodPlugins = [
    cssnano({
        preset: 'default'
    })
];

module.exports = function(ctx) {

    const environments = Environments(ctx.env);

    return {
        plugins: basePlugins.concat(environments.isProduction ? prodPlugins : [])
    };
}
