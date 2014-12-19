'use strict';
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var RouteGenerator = ScriptBase.extend({
  constructor: function() {
    ScriptBase.apply(this, arguments);

    this.option('uri', {
      desc: 'Allow a custom uri for routing',
      type: String,
      required: false
    });

    var bower = require(path.join(process.cwd(), 'bower.json'));
    var match = require('fs').readFileSync(
      path.join(this.config.get('appPath'), 'scripts/app.js'), 'utf-8'
    ).match(/\.when/);

    if (
      bower.dependencies['angular-route'] ||
      bower.devDependencies['angular-route'] ||
      match !== null
    ) {
      this.foundWhenForRoute = true;
    }
  },

  writing: {
    rewriteAppJs: function() {
      if (!this.foundWhenForRoute) {
        this.on('end', function () {
          this.log(chalk.yellow(
            '\nangular-route is not installed. Skipping adding the route to scripts/app.js'
          ));
        });

        return;
      }

      this.uri = this.name;
      if (this.options.uri) {
        this.uri = this.options.uri;
      }

      var config = {
        file: path.join(
          this.config.get('appPath'),
          'scripts/app.js'),
        needle: '.otherwise',
        splicable: [
          "  templateUrl: 'views/" + this.name.toLowerCase() + ".html',",
          "  controller: '" + this.artifactName + "Ctrl'"
        ]
      };

      config.splicable.unshift(".when('/" + this.uri + "', {");
      config.splicable.push("})");

      angularUtils.rewriteFile(config);

      this.composeWith('controller', { arguments: [this.name] }, {
          local: require.resolve('../controller/index.js')
      });

      this.composeWith('view', { arguments: [this.name.toLowerCase()] }, {
          local: require.resolve('../view/index.js')
      });
    }
  }
});

module.exports = RouteGenerator;
