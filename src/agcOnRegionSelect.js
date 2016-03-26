/* global angular */
(function () {
    angular.module('googlechart')
        .directive('agcOnRegionSelect', onRegionSelectDirective);

    function onRegionSelectDirective() {
        return {
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function (scope, element, attrs, googleChartController) {
                callback.$inject = ['args', 'chartWrapper', 'chart'];
                function callback(args, chartWrapper, chart) {
                    var returnParams = {
                        chartWrapper: chartWrapper,
                        chart: chart,
                        args: args,
                        column: args[0].column,
                        row: args[0].row
                    };
                    scope.$apply(function () {
                        scope.$eval(attrs.agcOnRegionSelect, returnParams);
                    });
                }
                googleChartController.registerChartListener('regionClick', callback, this);
            }
        };
    }
})();