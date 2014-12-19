'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var FilterGenerator = ScriptBase.extend({
  constructor: function() {
    ScriptBase.apply(this, arguments);
  },

  createFilterFiles: function() {
    this.generateSourceAndTest(
      'filter',
      'spec/filter',
      'filters',
      true	// Skip adding the script to the index.html file of the application
    );
  },

  // Re-write the main app module to account for our new dependency
  injectDependenciesToApp: function () {
    angularUtils.injectIntoFile(
      this.config.get('appPath'),
        'filters/' + this.name.toLowerCase(),
        '',
        this.scriptAppName + '.' + this.moduleName + '.filters'
    );
  }
});

module.exports = FilterGenerator;
