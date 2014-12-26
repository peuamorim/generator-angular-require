'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var FactoryGenerator = ScriptBase.extend({
	constructor: function () {
		ScriptBase.apply(this, arguments);
	},

	createServiceFiles: function () {
		this.generateSourceAndTest(
			'service/factory',
			'spec/service',
			'services',
			'factory'
		);
	}

	//// Re-write the main app module to account for our new dependency
	injectDependenciesToApp: function () {
		angularUtils.injectIntoPackageIncludeFile(
			path.join('app', 'packages', this.packageName, 'app.js'),
			path.join(this.packageName, 'services', this.fileName + '-factory'),
			this.moduleNamespace
		);
	}
});

module.exports = FactoryGenerator;
