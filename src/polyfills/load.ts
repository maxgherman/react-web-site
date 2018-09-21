require('es6-promise').polyfill();

export const load = () => {
    return new Promise((resolve) => {
        if (
            'fetch' in window &&
            'assign' in Object &&
            'entries' in Object &&
            'keys' in Object &&
            'forEach' in NodeList.prototype &&
            'includes' in Array.prototype &&
            'URL' in window &&
            'Map' in window &&
            'Intl' in window &&
            'startsWith' in String.prototype &&
            'endsWith' in String.prototype &&
            'includes' in String.prototype
        ) {
            resolve();
            return;
        }

        import('./polyfills')
        .then(resolve);
    });
};
