/* global angular */
(function(){
    angular.module('googlechart')
        .provider('googleJsapiUrl', googleJsapiUrlProvider);

    function googleJsapiUrlProvider() {
        var protocol = 'https:';
        var url = '//www.google.com/jsapi';
        var gstaticUrl = '//www.gstatic.com/charts/loader.js';

        this.setProtocol = function (newProtocol) {
            protocol = newProtocol;
        };

        this.setUrl = function (newUrl) {
            url = newUrl;
        };

        this.$get = ['googleChartApiConfig', function (config) {
            var urlToUse = config.useGstaticLoader ? gstaticUrl : url;
            return (protocol ? protocol : '') + urlToUse;
        }];
    }
})();
