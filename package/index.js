'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var PackageGenerator = ScriptBase.extend({
	constructor: function (name) {
		ScriptBase.apply(this, arguments);


		var angMods = ['"ngResource"', '"ngCookies"', '"ngSanitize"', '"ngRoute"', '"ngAnimate"', '"ngTouch"'];

		this.angularModules = '\n    ' + angMods.join(',\n    ') + '\n  ';


	},

	createServiceFiles: function () {

		this.appTemplate('packageapp', path.join('packages', this.packageName, 'app'));

	},

	// Re-write the main app module to account for our new dependency
	injectDependenciesToApp: function () {
		angularUtils.injectIntoFile(
			this.config.get('appPath'),
			path.join('packages', this.packageName, 'app.js'),
			'',
			this.scriptAppName + '.' + this.packageName
		);
	}
});

module.exports = PackageGenerator;
