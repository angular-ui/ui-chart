describe('uiChart Directive', function  () {
  var $compile, scope, element;

  beforeEach(module('ui.chart'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  afterEach(function () {
    element.remove();
    scope.$destroy();
  });

  var elemId = 1;

  function compile(dataSource, options) {
    if (angular.isUndefined(options)) {
      options = '';
    }

    element = $compile('<div id="myPlot' + elemId + '" ui-chart="' + dataSource + '" ' + options + '></div>')(scope).appendTo($('body'));
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

   it('should allow jqPlot to insert chart elements', function () {
    compile('data');
    scope.data = [
      [1,2,3],
      [4,5,6]
    ];
    scope.$digest();

    expect(element[0].children.length).toBeGreaterThan(0);
  });

  it('should retrieve jqPlot options from scope', function () {
    spyOn($, 'jqplot');
    compile('data', 'chart-options="myOpts"');
    scope.data = [[1,2,3]];
    scope.myOpts = {foo: 'bar'};
    scope.$digest();

    expect($.jqplot).toHaveBeenCalledWith(
      jasmine.any(String),
      scope.data,
      scope.myOpts
    );
  });

  it('should throw an exception if options are not an object', function () {
    expect(function () {
      compile('data', 'chart-options="myOptsThatDontExistWhoops"');
      scope.data = [[1,2,3]];
      scope.$digest();
    }).toThrow('Invalid ui.chart options attribute');
  });

  it('should throw an exception if callbacks are not an object', function () {
    expect(function () {
      compile('data', 'callbacks="myNonExistentCallbacks"');
      scope.data = [[1,2,3]];
      scope.$digest();
    }).toThrow('Invalid ui.chart callbacks attribute');
  });

  it('should rerender the plot if options in scope change', function () {
    spyOn($, 'jqplot');
    compile('data', 'chart-options="myOpts"');
    scope.data = [[1,2,3]];
    scope.myOpts = {
      hello: 'world'
    };
    scope.$digest();

    expect($.jqplot).toHaveBeenCalledWith(
      jasmine.any(String),
      scope.data,
      {
        hello: 'world'
      }
    );

    scope.myOpts = {
      foo: 'bar'
    };
    scope.$digest();

    expect($.jqplot).toHaveBeenCalledWith(
      jasmine.any(String),
      scope.data,
      {
        foo: 'bar'
      }
    );
  });

  it('should leave the element empty if data is not an array', function () {
    spyOn($, 'jqplot').andCallThrough();
    compile('data');
    scope.data = null;
    scope.$digest();

    expect(element[0].children.length).toBe(0);
    expect($.jqplot).not.toHaveBeenCalled();
  });

  it('should remove the element contents if data becomes something not an array', function () {
    compile('data');
    scope.data = [
      [1,2,3],
      [4,5,6]
    ];
    scope.$digest();

    expect(element[0].children.length).toBeGreaterThan(0);

    scope.data = null;
    scope.$digest();

    expect(element.html()).toBe('');
    expect(element[0].children.length).toBe(0);
  });
});
