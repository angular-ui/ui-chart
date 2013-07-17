describe('uiChart', function () {
  google.load('visualization', '1.0', {'packages':['corechart']});

  var scope, $compile, element1, element2;

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
    runs(function () {
      element1 = $compile('<ui-chart id="TestChart1"></ui-chart>')(scope);
      element2 = $compile('<ui-chart id="TestChart2"></ui-chart>')(scope);
    });
    waits(1);
  }

  describe('$dataTable', function () {
    it('should return the formatted table', inject(function ($dataTable) {
      spyOn($dataTable, 'convertArrayToTable');
      compile();

      var data = [
        ['Foo', 'Bar'],
        [0, 0],
        [0, 0]
      ];

      var dataTable = $dataTable.convertArrayToTable('PieChart', element1, data);

      expect($dataTable.convertArrayToTable).toHaveBeenCalled();
      expect(dataTable).toBeDefined();
      //expect(dataTable.H[0].label).toBe('Foo');
    }));
  });
});