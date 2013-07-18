describe('uiChart Directive', function  () {
  var $compile, scope, element;

  beforeEach(module('ui.chart'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  afterEach(function () {
    element = undefined;
    scope.$destroy();
  });

  function compile(dataSource, options) {
    if (angular.isUndefined(options)) {
      options = '';
    }

    element = $compile('<div ui-chart="' + dataSource + '" ' + options + '></div>')(scope);
  }

  it('should call jqPlot when directive is compiled', function () {
    spyOn($, 'jqplot');

    compile('data');

    scope.data = [
      [1,2,3],
      [4,5,6]
    ];

    scope.$digest();

    expect($.jqplot).toHaveBeenCalled();
  });
});