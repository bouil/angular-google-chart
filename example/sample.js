/* global angular */

angular.module("google-chart-sample", ["ngRoute", "googlechart"]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/fat', {
                templateUrl: 'example/partials/fat.html',
                controller: 'FatChartCtrl'
            }).
            when('/annotation', {
                templateUrl: 'example/partials/annotation.html',
                controller: 'AnnotationChartCtrl'
            }).
            when('/gauge', {
                templateUrl: 'example/partials/gauge.html',
                controller: 'GaugeChartCtrl'
            }).
            when('/generic/:chartType', {
                templateUrl: 'example/partials/generic.html',
                controller: 'GenericChartCtrl'
            }).
            otherwise({
                redirectTo: '/fat'
            });
    }]).value('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart', 'gauge'],
                language: 'fr'
            }
    });
