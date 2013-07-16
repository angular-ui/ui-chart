'use strict';

angular.module('ui.chart')
  .controller('DemoCtrl', function ($scope, $chart) {
    $scope.chartData = [
      ['Animals', 'Favorite %'],
      ['Giant Panda', 10],
      ['Shark', 5],
      ['Skunk', 1],
      ['Elephant', 6],
      ['Cow', 6],
      ['Pig', 5]
    ];

    $scope.chartOptions = {
      type: 'PieChart',
      data: $scope.chartData
    };

    $scope.drawChart = function (type, target) {
      $scope.chartOptions.type = type;
      $scope.chartOptions.target = target;
      $chart.drawChart($scope.chartOptions);
    };
  });