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

  it('should rerender the plot if options in scope change', function () {
    //TODO
  });

  it('should accept renderer from directive attribute', function () {
    spyOn($, 'jqplot');
    $.jqplot.SomeWeirdRenderer = 'Hello!';
    compile('data', 'renderer="someWeird"');
    scope.data = [1,2,3];
    scope.$digest();

    expect($.jqplot).toHaveBeenCalledWith(
      jasmine.any(String),
      scope.data,
      {
        seriesDefaults: {
          renderer: 'Hello!'
        }
      }
    );
  });

  it('should override scope options renderer with directive attribute renderer', function () {
    spyOn($, 'jqplot');
    $.jqplot.SomeWeirdRenderer = 'Goodbye!';
    compile('data', 'renderer="someWeird" options="myOpts"');
    scope.data = [1,2,3];
    scope.myOpts = {
      seriesDefaults: {
        renderer: 'Aloha!',
        moo: 'czar'
      },
      foo: 'bar'
    };
    scope.$digest();

    expect($.jqplot).toHaveBeenCalledWith(
      jasmine.any(String),
      scope.data,
      {
        seriesDefaults: {
          renderer: 'Goodbye!',
          moo: 'czar'
        },
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
    element.html('foo');

    expect(element.html()).toBe('foo');

    scope.data = null;
    scope.$digest();

    expect(element.html()).toBe('');
  });
});