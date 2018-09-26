

const Values = Object.freeze({
    Prod: 'production',
    Development: 'development',
    Analysis: 'analyse'
});

module.exports = (env) => {
    return {
        get isProduction() {
            return env === Values.Prod;
        },

        get isDevelopment() {
            return env === Values.Development;
        },

        get isAnalysis() {
            return env === Values.Analysis;
        },

        get current() {
            return env;
        }
    };
};