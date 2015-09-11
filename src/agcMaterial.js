/* global angular */
(function(){
    angular.module('googlechart')
        .directive('agcMaterial', onReadyDirective);
        
    function onReadyDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: 'googleChart',
            link: function(scope, element, attrs, googleChartController){
                var transformer = {};
                
                transformer.$transform = function(type, options){
                    if (type == 'google.charts.Bar' && google.charts.Bar){
                        return google.charts.Bar.convertOptions(options);
                    }
                    return options;
                };
                transformer.$transform.$inject=['type','options'];
                transformer.priority = 1000;
                googleChartController.registerOptionTransformer(transformer);
            }
        };
    }
})();