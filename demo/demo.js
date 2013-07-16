'use strict';

angular.module('ui.chart')
  .controller('DemoCtrl', function ($scope, $chart) {
    $scope.chart1Data = [
      ['Animals', 'Favorite %'],
      ['Giant Panda', 10],
      ['Shark', 5],
      ['Skunk', 1],
      ['Elephant', 6],
      ['Cow', 6],
      ['Pig', 5]
    ];

    $scope.chart2Data = [
      ['Age', 'Weight'],
      [8, 12],
      [4, 5.5],
      [11, 14],
      [4, 5],
      [3, 3.5],
      [6.5, 7]
    ];

    $scope.chart1 = {
      type: 'PieChart',
      data: $scope.chart1Data
    };

    $scope.chart2 = {
      type: 'ScatterChart',
      data: $scope.chart2Data
    };

    $scope.drawChart = function (type, target, chart) {
      $scope[chart].type = type;
      $scope[chart].target = target;
      $chart.drawChart($scope[chart]);
    };
  });