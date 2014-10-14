angular.module('ui.chart', [])
  .directive('uiChart', function () {
    return {
      restrict: 'EACM',
      template: '<div></div>',
      replace: true,
      link: function (scope, elem, attrs) {
        var renderChart = function () {
          var data = scope.$eval(attrs.uiChart);
          elem.html('');
          if (!angular.isArray(data)) {
            return;
          }

          var opts = {};
          if (!angular.isUndefined(attrs.chartOptions)) {
            opts = scope.$eval(attrs.chartOptions);
            if (!angular.isObject(opts)) {
              throw 'Invalid ui.chart options attribute';
            }
          }

          var callbacks = {};
          if (!angular.isUndefined(attrs.callbacks)) {
            callbacks = scope.$eval(attrs.callbacks);
            if (!angular.isObject(callbacks)) {
              throw 'Invalid ui.chart callbacks attribute';
            }
          }

          elem.jqplot(data, opts);

          angular.forEach(callbacks, function(callback, eventName) {
            elem.bind(eventName, callback);
          });
        };

        scope.$watch(attrs.uiChart, function () {
          renderChart();
        }, true);

        scope.$watch(attrs.chartOptions, function () {
          renderChart();
        });
      }
    };
  });
