var path = require('path');

module.exports = {
    
    getAliases: function(srcRoot) {
        return {
            '@app': path.join(srcRoot, 'app'),
            '@utils': path.join(srcRoot, 'utils')
        };
    }
}