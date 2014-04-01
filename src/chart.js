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
            return;
          }

          var id = elem.attr('id');
          if (angular.isUndefined(id)) {
              throw 'Invalid ui.graph id attribute';
          }

          var opts = {};
          if (!angular.isUndefined(attrs.chartOptions)) {
            opts = scope.$eval(attrs.chartOptions);
            if (!angular.isObject(opts)) {
              throw 'Invalid ui.chart options attribute';
            }
          }

          $(elem).unbind("jqplotDataClick");
          $.jqplot(id, data, opts).destroy();
          $(elem).html('');
          $.jqplot(id, data, opts);

          var click_callback = scope.$eval(attrs.chartClick);
          if (angular.isFunction(click_callback)) {
            return $(elem).bind('jqplotDataClick', function(ev, seriesIndex, pointIndex, data) {
              return click_callback(ev, seriesIndex, pointIndex, data);
            });
          }
          
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