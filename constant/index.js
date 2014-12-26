'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var ConstantGenerator = ScriptBase.extend({
	constructor: function (name) {
		ScriptBase.apply(this, arguments);
		this.artifactType = 'constants';
	},

	createServiceFiles: function () {
		this.generateSourceAndTest(
			'service/constant',
			'spec/service',
			'constants',
			'constant'
		);
	},

	//// Re-write the main app module to account for our new dependency
	injectDependenciesToApp: function () {
		angularUtils.injectIntoPackageIncludeFile(
			path.join('app', 'packages', this.packageName, 'app.js'),
			path.join('constants', this.fileName + '-constant'),
			this.moduleNamespace
		);
	}
});

module.exports = ConstantGenerator;
