# ui-chart directive [![Build Status](https://travis-ci.org/angular-ui/ui-chart.png?branch=master)](https://travis-ci.org/angular-ui/ui-chart)

This directive allows you to add a [jqPlot graph](http://www.jqplot.com/) to your application.

# Requirements

- AngularJS
- jQuery
- jqPlot

# Testing

We use karma and jshint to ensure the quality of the code.  The easiest way to run these checks is to use grunt:

    npm install -g grunt-cli bower
    npm install grunt

The karma task will try to open Chrome as a browser in which to run the tests. Make sure this is available or change the configuration in test\test.config.js

# Usage

We use [bower](http://twitter.github.com/bower/) for dependency management.  Add

    dependencies: {
        "angular-ui-chart": "latest"
    }

To your `bower.json` file. Then run

    bower install

This will copy the ui-chart files into your `bower_components` folder, along with its dependencies. Load the script files in your application:

    <script type="text/javascript" src="bower_components/jquery/jquery.js"></script>
    <script type="text/javascript" src="bower_components/jqplot/jquery.jqplot.js"></script>
    <script type="text/javascript" src="bower_components/angular/angular.js"></script>

Add the chart module as a dependency to your application module:

    var myAppModule = angular.module('myApp', ['ui.chart'])

Apply the directive to your div elements as an element, attribute, class, or comment:

    <ui-chart="data1"></ui-chart>
    <div ui-chart="data2"></div>
    <div class="ui-chart; data3"></div>
    <!-- directive: ui-chart data4 -->

Your data to pass to `$.jqplot` will be the evaluated value of the `ui-chart` attribute, while the options to pass to `$.jqplot` will be the evaluated value of the `chart-options` attribute - the evaluations are done in scope.

# Options

This plugin supports usage of any option present for a chart in jqplot.  This value will be provided by the evaluated value in scope on the `chart-options` attribute.

    <ui-chart="data" chart-options="chartOptions"></ui-chart>

    angular.module('myApp')
      .controller('DemoCtrl', function ($scope) {
        $scope.data = [[
          ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
          ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
        ]];

        $scope.chartOptions = { 
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
        };
      });
