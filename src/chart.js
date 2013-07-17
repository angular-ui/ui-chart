/**
 * Binds a Google Chart iframe to <div> elements.
 */
angular.module('ui.chart', [])
  .value('uiChartConfig', {})
  .factory('$dataTable', ['uiChartConfig', function (uiChartConfig) {
    var dataTables = [];
    return {
      convertArrayToTable: function (type, target, data) {
        for (var i = 0; i < dataTables.length; i++) {
          if ((dataTables[i].type === type) && (dataTables[i].target === target) && (dataTables[i].data = google.visualization.arrayToDataTable(data))) {
            return dataTables[i].data;
          }
        }

        var table = google.visualization.arrayToDataTable(data);

        dataTables.push({
          type: type,
          target: target,
          data: table
        });

        return table;
      }
    };
  }])
  .factory('$chart', ['uiChartConfig', '$rootScope', '$dataTable', function (uiChartConfig, $rootScope, $dataTable) {
    var charts = [];
    return {
      drawChart: function (chart) {
        var type = chart.type,
          target = chart.target,
          data = $dataTable.convertArrayToTable(type, target, chart.data),
          options = chart.options;

        $rootScope.$broadcast('$draw:chart', [type, target, data, options]);
      },
      set: function (obj) {
        for (var i = 0; i < charts.length; i++) {
          if (charts[i].pd.id === obj.pd.id) {
            charts[i] = obj;
            return;
          }
        }

        charts.push(obj);
      },
      get: function (id, type, elem) {
        for (var i = 0; i < charts.length; i++) {
          if (charts[i].pd.id === id) {
            return charts[i];
          }
        }

        var newChart = new google.visualization[type](elem);

        charts.push(newChart);

        return newChart;
      },
      getById: function (id) {
        for (var i = 0; i < charts.length; i++) {
          if (charts[i].pd.id === id) {
            return charts[i];
          }
        }

        return false;
      }
    };
  }])
  .directive('uiChart', ['uiChartConfig', '$chart', function (uiChartConfig, $chart) {
    var generatedIds = 0;
    return {
      replace: true,
      restrict: 'EAC',
      template: '<div></div>',
      link: function (scope, elem, attrs) {
        var chart;

        if (!attrs.id) {
          attrs.$set('id', 'uiChart' + generatedIds++);
        }

        scope.$on('$draw:chart', function (e, obj) {
          var type = obj[0],
            target = obj[1],
            data = obj[2],
            options = obj[3];

          if (target === attrs.id) {
            chart = $chart.get(target, type, elem[0]);

            chart.draw(data, options);
          }
        });
      }
    };
  }]);