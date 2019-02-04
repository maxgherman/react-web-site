

const Values = Object.freeze({
    Prod: 'production',
    Development: 'development'
});

module.exports = (env) => {
    return {
        get isProduction() {
            return env === Values.Prod;
        },

        get isDevelopment() {
            return env === Values.Development;
        },

        get current() {
            return env;
        }
    };
};