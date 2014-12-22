'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var DirectiveGenerator = ScriptBase.extend({
  constructor: function(name) {
    ScriptBase.apply(this, arguments);
    this.artifactType = 'directives';
  },

  createDirectiveFiles: function() {
    this.generateSourceAndTest(
      'directive',
      'spec/directive',
      'directives',
      true	// Skip adding the script to the index.html file of the application
    );
  },

  // Re-write the main app module to account for our new dependency
  injectDependenciesToApp: function() {
    angularUtils.injectIntoFile(
      this.config.get('appPath'),
        'directives/' + this.name.toLowerCase(),
        '',
        this.scriptAppName + '.' + this.moduleName + '.directives'
    );
  }
});

module.exports = DirectiveGenerator;
