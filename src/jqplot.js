angular.module('ui.chart', [])
  .directive('uiChart', function () {
    return {
      restrict: 'EACM',
      template: '<div></div>',
      link: function (scope, elem, attrs) {
        scope.$watch(attrs.uiChart, function (data) {
          // if data is undefined then empty element
          if (angular.isUndefined(data)) {
            return;
          }

          console.log(data);
          elem.jqplot(data);
        }, true);
      }
    };
  });