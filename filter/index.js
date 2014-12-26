'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var FilterGenerator = ScriptBase.extend({
	constructor: function () {
		ScriptBase.apply(this, arguments);
		this.artifactType = 'filters';
	},

	createFilterFiles: function () {
		this.generateSourceAndTest(
			'filter',
			'spec/filter',
			'filters',
			'filter'
		);
	},

	//// Re-write the main app module to account for our new dependency
	injectDependenciesToApp: function () {
		angularUtils.injectIntoPackageIncludeFile(
			path.join('app', 'packages', this.packageName, 'app.js'),
			path.join(this.packageName, 'filters', this.fileName + '-filter'),
			this.moduleNamespace
		);
	}
});

module.exports = FilterGenerator;
