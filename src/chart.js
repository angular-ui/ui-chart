angular.module('ui.chart', [])
  .directive('uiChart', function () {
    return {
      restrict: 'EACM',
      template: '<div></div>',
      link: function (scope, elem, attrs) {
        scope.$watch(attrs.uiChart, function (data) {
          if (angular.isUndefined(data)) {
            return;
          }

          var opts = {};
          if (!angular.isUndefined(attrs.options)) {
            opts = scope.$eval(attrs.options);
          }
          if (!angular.isUndefined(attrs.renderer)) {
            if (angular.isUndefined(opts.seriesDefaults)) {
              opts.seriesDefaults = {};
            }
            var r = attrs.renderer;
            var r = r.charAt(0).toUpperCase() + r.slice(1);
            opts.seriesDefaults.renderer = $.jqplot[r + 'Renderer'];
          }

          elem.jqplot(data, opts);
        }, true);
      }
    };
  });