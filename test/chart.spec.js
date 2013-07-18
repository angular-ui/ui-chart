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

  var elemId = 1;

  function compile(dataSource, options) {
    if (angular.isUndefined(options)) {
      options = '';
    }

    element = $compile('<div id="myPlot' + elemId + '" ui-chart="' + dataSource + '" ' + options + '></div>')(scope);
    ++elemId;
  }

  it('should call jqPlot when directive is compiled', function () {
    spyOn($, 'jqplot');
    compile('data');
    scope.data = [
      [1,2,3],
      [4,5,6]
    ];
    scope.$digest();

    expect($.jqplot).toHaveBeenCalledWith(
      jasmine.any(String),
      scope.data,
      {}
    );
  });

  it('should retrieve jqPlot options from scope', function() {
    spyOn($, 'jqplot');
    compile('data', 'options="myOpts"')
    scope.data = [1,2,3];
    scope.myOpts = {foo: 'bar'};
    scope.$digest();

    expect($.jqplot).toHaveBeenCalledWith(
      jasmine.any(String),
      scope.data,
      scope.myOpts
    );
  });

  it('should rerender the plot if options in scope change', function() {
    //TODO
  })
});