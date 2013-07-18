angular.module('myChartingApp', ['ui.chart'])
  .controller('DemoCtrl', function ($scope) {
    $scope.someData = function () {
      return [
        [1,2,3],
        [4,5,6]
      ];
    };

    $scope.chartOptions = {
      seriesDefaults: {
        // Make this a pie chart.
        renderer: $.jqplot.PieRenderer, 
        rendererOptions: {
          // Put data labels on the pie slices.
          // By default, labels show the percentage of the slice.
          showDataLabels: true
        }
      }, 
      legend: { show:true, location: 'e' }
    };
  });