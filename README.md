# ui-chart directive

This directive allows you to add a [Google Chart](https://developers.google.com/chart/) to your application.

# Requirements

- AngularJS

# Testing

We use karma and jshint to ensure the quality of the code. The easiest way to run these checks is to use grunt:

npm install -g grunt-cli npm install bower install grunt

The karma task will try to open Chrome as a browser in which to run the tests. Make sure this is available or change the configuration in test\test.config.js

# Usage

We use [bower](http://twitter.github.com/bower/) for dependency management.  Add

    dependencies: {
        "angular-ui-chart": "latest"
    }

To your `bower.json` file. Then run

    bower install

This will copy the ui-chart files into your `bower_components` folder, along with its dependencies. Load the script files in your application:

    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
        google.load('visualization', '1.0', {'packages':['corechart']});
    </script>
    <script type="text/javascript" src="bower_components/angular/angular.js"></script>
    <script type="text/javascript" src="bower_components/angular-ui-chart/chart.js"></script>

Add the chart module as a dependency to your application module:

    var myAppModule = angular.module('MyApp', ['ui.chart'])

Apply the directive to your div elements as an element, attribute, or class:

    <ui-chart id="Chart1"></ui-chart>
    <div ui-chart id="Chart2"></div>
    <div class="ui-chart" id="Chart3"></div>

In your controller, specify the `$chart` service as a dependency and pass along the chart type, formatted data, and 

    myAppModule.controller('MyController', function ($scope, $chart) {
      $scope.chart = {
        type: 'PieChart',
        data: data //data for graph in array
      };

      $chart.draw($scope.chart);
    });

## Options

All of the chart options can be passed through the directive.  The chart type must be specified in the `type` property.

    myAppModule.controller('MyController', function ($scope, $chart) {
      $scope.chart = {
        type: 'PieChart',
        data: data, //data for graph in array
        options: {
          title: 'My Daily Activities',
          legend: {
            position: 'right',
            textStyle: {
              color: 'blue',
              fontSize: 16
            }
          }
        }
      };
    });