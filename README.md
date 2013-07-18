# ui-jqplot directive

This directive allows you to add a [jqPlot graph](http://www.jqplot.com/) to your application.

# Requirements

- AngularJS
- jQuery
- jqPlot

# Testing

We use karma and jshint to ensure the quality of the code.  The easiest way to run these checks is to use grunt:

    npm install -g grunt-cli bower
    npm install grunt

The karma task will try to open Chrome as a browser in which to run the tests. Make sure this is available or change the configuration in test\test.config.js