/* global angular */
(function(){
    angular.module('googlechart')
        .directive('agcOnReady', onReadyDirective);
        
    onReadyDirective.$inject = ['$timeout'];
    function onReadyDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function(scope, element, attrs, googleChartController){
                callback.$inject=['chartWrapper'];
                function callback(chartWrapper){
                    $timeout(function (){
                        scope.$eval(attrs.agcOnReady, {chartWrapper: chartWrapper});
                    }, 0);
                }
                googleChartController.registerWrapperListener('ready', callback, this);
            }
        };
    }
})();
