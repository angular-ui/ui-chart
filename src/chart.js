angular.module('ui.chart', [])
  .directive('uiChart', function () {
    return {
      restrict: 'EACM',
      template: '<div></div>',
      replace: true,
      scope: {
        data: "=uiChart",
        opts: "=chartOptions"
      },
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
        $scope.createGraph = function() {
          if (!angular.isUndefined($attrs.chartOptions)) {
            if (!angular.isObject($scope.opts)) {
              throw 'Invalid ui.chart options attribute';
            }
          }
          return $element.jqplot(
              $scope.data,
              $scope.opts || {}
          ).data("jqplot");
        };
        $scope.replot = function() {
          var options = $scope.opts || {};
          options.data = $scope.data;
          options.clear = true;
          $scope.jqplot.replot(options);
        };
        $scope.renderChart = function() {
          if (angular.isArray($scope.data)) {
            if ($scope.jqplot) {
              $scope.replot();
            } else {
              $scope.jqplot = $scope.createGraph();
            }
          } else {
            if ($scope.jqplot) {
              $scope.destroy();
            }
          }
        };
        $scope.assignEventHandlers = function() {
          $scope.$watch("data", function () {
            $scope.renderChart();
          }, true);
          $scope.$watch("opts", function () {
            $scope.renderChart();
          });
          $element.on("$destroy", function() {
            $scope.destroy();
          });
        };
        $scope.destroy = function() {
          if ($scope.jqplot) {
            $scope.jqplot.destroy();
            $scope.jqplot = null;
          }
        };
      }],
      link: function (scope, elem, attrs, ctrl) {
        scope.assignEventHandlers();
      }
    };
  });
