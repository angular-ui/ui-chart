angular.module('myChartingApp', ['ui.chart', 'prettifyDirective' ])
  .value('charting', {
    pieChartOptions: { 
      seriesDefaults: {
        // Make this a pie chart.
        renderer: jQuery.jqplot.PieRenderer, 
        rendererOptions: {
          // Put data labels on the pie slices.
          // By default, labels show the percentage of the slice.
          showDataLabels: true
        }
      }, 
      legend: { show:true, location: 'e' }
    }
  })
  .controller('DemoCtrl', function ($scope, charting) {
    $scope.someData = [[
      ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
      ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
    ]];

    $scope.myChartOpts = charting.pieChartOptions;
  });