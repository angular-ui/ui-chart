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
          if (!angular.isUndefined(attrs.renderer)) {
            if (angular.isUndefined(opts.seriesDefaults)) {
              opts.seriesDefaults = {};
            }
            var r = attrs.renderer;
            r = r.charAt(0).toUpperCase() + r.slice(1);
            opts.seriesDefaults.renderer = $.jqplot[r + 'Renderer'];
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