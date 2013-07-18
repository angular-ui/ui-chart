angular.module('ui.chart', [])
  .directive('uiChart', function () {
    return {
      restrict: 'EACM',
      template: '<div></div>',
      replace: true,
      link: function (scope, elem, attrs) {
        var renderChart = function () {
          var data = scope.$eval(attrs.uiChart);
          if (!angular.isArray(data)) {
            elem.html('');
            return;
          }

          var opts = {};
          if (!angular.isUndefined(attrs.options)) {
            opts = scope.$eval(attrs.options);
            if (!angular.isObject(opts)) {
              throw 'Invalid ui.chart options attribute';
            }
          }

          elem.jqplot(data, opts);
        };

        scope.$watch(attrs.uiChart, function () {
          renderChart();
        }, true);

        scope.$watch(attrs.options, function () {
          renderChart();
        });
      }
    };
  });