(function() {
    'use strict';

    describe('newLoaderVersion', function() {
        var apiConfig, newLoaderVersion;

        beforeEach(module('googlechart'));
        var expectedDefault = 'current';

        it('should return current if no config given', function() {
            injectNewLoaderVersion();

            expect(newLoaderVersion()).toEqual(expectedDefault);
        });

        function injectNewLoaderVersion() {
            inject(function(_newLoaderVersion_) {
                newLoaderVersion = _newLoaderVersion_;
            });
        }

        it('should return the config version if valid', function() {
            injectApiConfig();
            apiConfig.version = 'upcoming';
            injectNewLoaderVersion();

            expect(newLoaderVersion()).toEqual('upcoming');
        });

        function injectApiConfig() {
            inject(function(googleChartApiConfig) {
                apiConfig = googleChartApiConfig;
            });
        }

        it('should also match frozen (double digit int) versions', function() {
            injectApiConfig();
            apiConfig.version = '44';
            injectNewLoaderVersion();

            expect(newLoaderVersion()).toEqual('44');
        });

        it('should return default if version is single-digit', function() {
            injectApiConfig();
            apiConfig.version = '1';
            injectNewLoaderVersion();

            expect(newLoaderVersion()).toEqual(expectedDefault);
        });

        it('should return default if version is non-numeric', function() {
            injectApiConfig();
            apiConfig.version = 'hello';
            injectNewLoaderVersion();

            expect(newLoaderVersion()).toEqual(expectedDefault);
        });
    });
})();
