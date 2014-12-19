'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var ServiceGenerator = ScriptBase.extend({
  constructor: function() {
    ScriptBase.apply(this, arguments);
  },

  writing: {
    createServiceFiles: function() {
      this.generateSourceAndTest(
        'service/service',
        'spec/service',
        'services',
        true	// Skip adding the script to the index.html file of the application
      );
    }
  },

  install: {
    // Re-write the main app module to account for our new dependency
    injectDependenciesToApp: function() {
      angularUtils.injectIntoFile(
        this.config.get('appPath'),
          'services/' + this.name.toLowerCase(),
          '',
          this.scriptAppName + '.' + this.moduleName + '.services'
      );
    }
  }
});

module.exports = ServiceGenerator;
