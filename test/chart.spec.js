describe('uiChart', function () {

  var scope, $compile, element1, element2;

  beforeEach(function () {
    runs(function () {
      google.load('visualization', '1.0', {'packages':['corechart']});
    });

    waitsFor(function () {
      return !angular.isUndefined(google.visualization.PieChart);
    });
  });

  beforeEach(module('ui.chart'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  afterEach(function () {
    element1 = undefined;
    element2 = undefined;

    scope.$destroy();
  });

  //asynchronous compilation of elements
  function compile() {
    element1 = $compile('<ui-chart id="TestChart1"></ui-chart>')(scope)[0];
    element2 = $compile('<ui-chart id="TestChart2"></ui-chart>')(scope)[0];
  }

  describe('$dataTable', function () {
    describe('convertArrayToTable', function () {
      it('should return the formatted table', inject(function ($dataTable) {
        spyOn($dataTable, 'convertArrayToTable').andCallThrough();
        compile();

        var data = [
          ['Foo', 'Bar'],
          [0, 0],
          [0, 0]
        ];

        var dataTable;

        dataTable = $dataTable.convertArrayToTable('PieChart', element1, data);

        expect($dataTable.convertArrayToTable).toHaveBeenCalled();
        expect(dataTable).toBeDefined();
        expect(dataTable.H[0].label).toBe('Foo');
      }));
    });
  });

  describe('$chart', function () {
    describe('$chart.draw', function () {
      it('should broadcast $draw:chart event', inject(function ($chart) {
        var trigger = false,
          chart = {
            type: 'PieChart',
            target: '#TestChart1',
            data: [
              ['Foo', 'Bar'],
              [0, 0],
              [0, 0]
            ]
          };

        scope.$on('$draw:chart', function () {
          trigger = true;
        });

        spyOn($chart, 'draw').andCallThrough();

        $chart.draw(chart);

        expect($chart.draw).toHaveBeenCalled();
        expect(trigger).toBe(true);
      }));
    });

    describe('$chart.get', function () {
      it('should create a new chart', inject(function ($chart) {
        spyOn($chart, 'get').andCallThrough();
        compile();
        
        var chart = $chart.get('TestChart1', 'PieChart', element1);

        expect($chart.get).toHaveBeenCalled();
        expect(chart.$g).toBe('pie');
        expect(chart.pd.id).toBe('TestChart1');
      }));

      it('should retrieve existing chart', inject(function ($chart) {
        compile();

        var chart1 = $chart.get('TestChart1', 'PieChart', element1);

        var chart2 = $chart.get('TestChart1');

        expect(chart2).toEqual(chart1);
      }));

      it('should not match a prior chart with different id and create a new chart', inject(function ($chart) {
        compile();

        var chart1 = $chart.get('TestChart1', 'PieChart', element1);

        var chart2 = $chart.get('TestChart2', 'LineChart', element2);

        expect(chart2).not.toEqual(chart1);
        expect(chart2.$g).not.toBe(chart1.$g);
        expect(chart2.pd.id).not.toBe(chart1.pd.id);
      }));
    });

    describe('$chart.set', function () {
      it('should return false on no matches', inject(function ($chart) {
        spyOn($chart, 'set').andCallThrough();
        var chart = $chart.set();

        expect($chart.set).toHaveBeenCalled();
        expect(chart).toBe(false);
      }));

      it('should match a prior chart and override its chart type', inject(function ($chart) {
        compile();

        var chart1 = $chart.get('TestChart1', 'PieChart', element1), chart2;

        chart2 = new google.visualization.LineChart(element1);

        chart2 = $chart.set(chart2);

        expect(chart2).not.toEqual(chart1);
        expect(chart2.$g).not.toBe(chart1.$g);
        expect(chart2.pd.id).toBe(chart1.pd.id);
      }));
    });

    describe('$chart.getById', function () {
      it('should return false on no matches', inject(function ($chart) {
        spyOn($chart, 'getById').andCallThrough();
        var result = $chart.getById();

        expect($chart.getById).toHaveBeenCalled();
        expect(result).toBe(false);
      }));

      it('should match a prior chart and retrieve it', inject(function ($chart) {
        compile();

        var chart1 = $chart.get('TestChart1', 'PieChart', element1), chart2;

        chart2 = $chart.getById('TestChart1');

        expect(chart1).toEqual(chart2);
      }));
    });
  });
});