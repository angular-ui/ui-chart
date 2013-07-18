angular.module('myChartingApp', ['ui.chart'])
  .controller('DemoCtrl', function ($scope) {
    $scope.someData = function () {
      return [
        [1,2,3],
        [4,5,6]
      ];
    };
  });