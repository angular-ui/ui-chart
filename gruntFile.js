module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma:unit']);
  grunt.registerTask('build-doc', ['uglify', 'copy']);
  grunt.registerTask('server', ['karma:start']);

  var testConfig = function (configFile, customOptions) {
    var options = { configFile: configFile, singleRun: true };
    var travisOptions = process.env.TRAVIS && { browsers: [ 'Firefox', 'PhantomJS'], reporters: ['dots'] };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({
    bower: 'bower_components',
    dist : '<%= bower %>/angular-ui-docs',
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n'),
      view : {
        humaName : "UI.Chart",
        repoName : "ui-chart",
        demoHTML : grunt.file.read("demo/demo.html"),
        demoJS : grunt.file.read("demo/demo.js"),
        css : [
          '<%= bower %>/jqplot/jquery.jqplot.css'
        ],
        js : [
          '<%= bower %>/jqplot/jquery.jqplot.js',
          '<%= bower %>/jqplot/plugins/jqplot.pieRenderer.js',
          'build/ui-chart.js'
        ]
      }
    },
    watch: {
      karma: {
        files: ['src/*.js', 'test/*.js'],
        tasks: ['karma:unit:run'] //NOTE the :run flag
      }
    },
    karma: {
      unit: testConfig('test/karma.conf.js'),
      start: {configFile: 'test/karma.conf.js'}
    },
    jshint:{
      all:['src/chart.js', 'gruntFile.js','test/**/*.js'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        evil:true,
        globals:{}
      }
    },
    uglify: {
      options: {banner: '<%= meta.banner %>'},
      build: {
        files: {
          '<%= dist %>/build/<%= meta.view.repoName %>.min.js': ['src/chart.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ['src/chart.js'], dest: '<%= dist %>/build/<%= meta.view.repoName %>.js', filter: 'isFile'},
          {src: ['<%= bower %>/jqplot-bower/dist/jquery.jqplot.css'], dest: '<%= dist %>/<%= bower %>/jqplot/jquery.jqplot.css', filter: 'isFile'},
          //{src: ['<%= bower %>/jquery/jquery.min.js'], dest: '<%= dist %>/<%= bower %>/jquery/jquery.min.js', filter: 'isFile'},
          {src: ['<%= bower %>/jqplot-bower/dist/jquery.jqplot.js'], dest: '<%= dist %>/<%= bower %>/jqplot/jquery.jqplot.js', filter: 'isFile'},
          {src: ['<%= bower %>/jqplot-bower/dist/plugins/jqplot.pieRenderer.js'], dest: '<%= dist %>/<%= bower %>/jqplot/plugins/jqplot.pieRenderer.js', filter: 'isFile'}
        ]
      },
      template : {
        options : {processContent : function(content){
          return grunt.template.process(content);
        }},
        files: [
          {src: ['<%= dist %>/.tmpl/index.tmpl'], dest: '<%= dist %>/index.html'}
        ]
      }
    }
  });

};