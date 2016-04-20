/* global angular */
/* eslint-env jasmine */
describe('googleJsapiUrl provider', function() {
    var googleJsapiUrl;

    beforeEach(module('googlechart'));

    describe('default configuration', function() {
        it ('should return regular jsapi url if nothing changed', function(){
            injectGoogleJsapiUrl();
            expect(googleJsapiUrl).toBe('https://www.google.com/jsapi');
        });
    })

    function injectGoogleJsapiUrl() {
        inject(function(_googleJsapiUrl_) {
            googleJsapiUrl = _googleJsapiUrl_;
        });
    }

    describe('configuring provider', function() {
        it ('should return http url if protocol changed', function(){
            configureProvider(function(provider) {
                provider.setProtocol('http:');
            });

            injectGoogleJsapiUrl();

            expect(googleJsapiUrl).toMatch(/^http:/);
            expect(googleJsapiUrl).not.toMatch(/^https:/);
        });

        function configureProvider(configFn) {
            module(function(googleJsapiUrlProvider) {
                configFn(googleJsapiUrlProvider);
            });
        }

        it ('should return url as set if it has been set', function(){
            configureProvider(function(provider) {
                provider.setUrl('//www.example.com/api');
            });

            injectGoogleJsapiUrl();

            expect(googleJsapiUrl).toMatch(/\/\/www\.example\.com\/api$/);
        });

        it('should return gstatic url if config option was set', function() {
            var config;
            inject(function(googleChartApiConfig) {
                config = googleChartApiConfig;
                config.useGstaticLoader = true;
            });

            injectGoogleJsapiUrl();

            expect(googleJsapiUrl).toBe('https://www.gstatic.com/charts/loader.js');
            config.useGstaticLoader = false;  // cleanup
        });
    });
});
