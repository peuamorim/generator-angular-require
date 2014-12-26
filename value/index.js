'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var ValueGenerator = ScriptBase.extend({
  constructor: function() {
    ScriptBase.apply(this, arguments);
    this.artifactType = 'services';
  },

  createServiceFiles: function() {
    this.generateSourceAndTest(
        'service/value',
        'spec/service',
        'services',
        'service'
    );
  },

  // Re-write the main app module to account for our new dependency
  injectDependenciesToApp: function() {
    angularUtils.injectIntoFile(
      this.config.get('appPath'),
        'services/' + this.name.toLowerCase(),
        '',
        this.scriptAppName + '.' + this.moduleName + this.dot + 'services'
    );
  }
});

module.exports = ValueGenerator;
