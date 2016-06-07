(function() {
    'use strict';
    angular.module('googlechart')
        .factory('newLoaderVersion', newLoaderVersionFactory);

    var NEW_LOADER_DEFAULT_VERSION = 'current';

    newLoaderVersionFactory.$inject = ['googleChartApiConfig'];

    function newLoaderVersionFactory(apiConfig) {
        return function() {
            if ('version' in apiConfig && versionIsValid()) {
                return apiConfig.version;
            } else {
                return NEW_LOADER_DEFAULT_VERSION;
            }
        };

        function versionIsValid() {
            var versionPattern = /upcoming|current|\d\d/;
            var match = apiConfig.version.match(versionPattern);
            return match !== null;
        }
    }
})();
