describe('uiChart', function () {

  var scope, $compile, $dataTable, element1, element2;

  beforeEach(function () {
    runs(function () {
      google.load('visualization', '1.0', {'packages':['corechart']});
    });

    waitsFor(function () {
      return !angular.isUndefined(google.visualization.PieChart);
    });
  });

  beforeEach(module('ui.chart'));
  beforeEach(inject(function (_$rootScope_, _$compile_, _$dataTable_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $dataTable = _$dataTable_;
  }));

  afterEach(function () {
    element1 = undefined;
    element2 = undefined;
    $dataTable = undefined;

    scope.$destroy();
  });

  //asynchronous compilation of elements
  function compile() {
    element1 = $compile('<ui-chart id="TestChart1"></ui-chart>')(scope)[0];
    element2 = $compile('<ui-chart id="TestChart2"></ui-chart>')(scope)[0];
  }

  describe('$dataTable', function () {
    it('should return the formatted table', function () {
      spyOn($dataTable, 'convertArrayToTable').andCallThrough();
      compile();

      var data = [
        ['Foo', 'Bar'],
        [0, 0],
        [0, 0]
      ];

      var dataTable;

      dataTable = $dataTable.convertArrayToTable('PieChart', element1, data);

      expect(dataTable).toBeDefined();
      expect(dataTable.H[0].label).toBe('Foo');
    });
  });
});