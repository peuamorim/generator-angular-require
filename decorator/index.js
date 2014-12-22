'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var fs = require('fs');
var yeoman = require('yeoman-generator');

var buildRelativePath = function(fileName){
  return path.join('decorators', fileName + "Decorator");
};

var DecoratorGenerator = ScriptBase.extend({
  constructor: function(name) {
    ScriptBase.apply(this, arguments);
    this.fileName = this.name;
    this.artifactType = 'decorators';

    util.inherits(DecoratorGenerator, ScriptBase);
  },

  askForOverwrite: function() {
    var cb = this.async();

    // TODO: Any yeoman.util function to handle this?
    if (fs.existsSync(path.join(
      this.env.cwd, this.env.options.appPath,
      'scripts', buildRelativePath(this.fileName) + ".js"
    ))) {
      var prompts = [{
        type: 'confirm',
        name: 'overwriteDecorator',
        message: 'Would you like to overwrite existing decorator?',
        default: false
      }];

      this.prompt(prompts, function (props) {
        this.overwriteDecorator = props.overwriteDecorator;

        cb();
      }.bind(this));
    }
    else{
      cb();
      return;
    }
  },

  askForNewName: function() {
    var cb = this.async();

    if (this.overwriteDecorator === undefined || this.overwriteDecorator === true) {
      cb();
      return;
    }
    else {
      var prompts = [];
      prompts.push({
        name: 'decoratorName',
        message: 'Alternative name for the decorator'
      });

      this.prompt(prompts, function (props) {
        this.fileName = props.decoratorName;

        cb();
      }.bind(this));
    }
  },

  createDecoratorFiles: function() {
    this.appTemplate(
      'decorator',
      path.join('scripts', buildRelativePath(this.fileName))
    );
    this.addScriptToIndex(buildRelativePath(this.fileName));
  },

  // Re-write the main app module to account for our new dependency
  injectDependenciesToApp: function () {
    angularUtils.injectIntoFile(
      this.config.get('appPath'),
        'decorators/' + this.name.toLowerCase(),
        '',
        this.scriptAppName + '.' + this.moduleName + '.decorators'
    );
  }
});

module.exports = DecoratorGenerator;
