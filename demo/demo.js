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

    $scope.chart3Data = [
      ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
      ['2004/05',  165,      938,         522,             998,           450,      614.6],
      ['2005/06',  135,      1120,        599,             1268,          288,      682],
      ['2006/07',  157,      1167,        587,             807,           397,      623],
      ['2007/08',  139,      1110,        615,             968,           215,      609.4],
      ['2008/09',  136,      691,         629,             1026,          366,      569.6]
    ];

    $scope.chart4Data = [
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ];

    $scope.chart5Data = [
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ];

    $scope.chart6Data = [
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ];

    $scope.chart1 = {
      data: $scope.chart1Data
    };

    $scope.chart2 = {
      data: $scope.chart2Data,
      options: {
        title: 'Age vs. Weight comparison',
        hAxis: {title: 'Age', minValue: 0, maxValue: 15},
        vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        legend: 'none'
      }
    };

    $scope.chart3 = {
      data: $scope.chart3Data,
      options: {
        title : 'Monthly Coffee Production by Country',
        vAxis: {title: "Cups"},
        hAxis: {title: "Month"},
        seriesType: "bars",
        series: {5: {type: "line"}}
      }
    };

    $scope.chart4 = {
      data: $scope.chart4Data,
      options: {
        title: 'Company Performance'
      }
    };

    $scope.chart5 = {
      data: $scope.chart5Data,
      options: {
        title: 'Company Performance',
        vAxis: {title: 'Year',  titleTextStyle: {color: 'red'}}
      }
    };

    $scope.chart6 = {
      data: $scope.chart6Data,
      options: {
        title: 'Company Performance',
        hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
      }
    };

    $scope.drawChart = function (type, target, chart) {
      $scope[chart].type = type;
      $scope[chart].target = target;
      $chart.drawChart($scope[chart]);
    };
  });