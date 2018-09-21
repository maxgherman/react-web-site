require('es6-promise').polyfill();

export const getPresence = () => {
    const result = [];

    'fetch' in window || result.push('fetch');
    'assign' in Object || result.push('assign');
    'entries' in Object || result.push('entries');
    'keys' in Object || result.push('keys');
    'forEach' in Array.prototype || result.push('forEach'),
    'includes' in Array.prototype || result.push('Array.includes'),
    'URL' in window || result.push('URL'),
    'Map' in window || result.push('Map'),
    'Intl' in window || result.push('Intl'),
    'startsWith' in String.prototype || result.push('startsWith'),
    'endsWith' in String.prototype || result.push('endsWith'),
    'includes' in String.prototype || result.push('String.includes');

    return result;
};

export const load = () => {
    return new Promise((resolve) => {
        const presence = getPresence();

        if (presence.length <= 0) {
            resolve();
            return;
        }

        import('./polyfills')
        .then(resolve);
    });
};
