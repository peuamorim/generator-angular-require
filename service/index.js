'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var ServiceGenerator = ScriptBase.extend({
	constructor: function () {
		ScriptBase.apply(this, arguments)
	},

	writing: {
		createServiceFiles: function () {
			this.generateSourceAndTest(
				'service/service',
				'spec/service',
				'services',
				'service'
			);
		}
	},

	install: {
		// Re-write the main app module to account for our new dependency
		injectDependenciesToApp: function () {
			angularUtils.injectIntoPackageIncludeFile(
				path.join('app', 'packages', this.packageName, 'app.js'),
				path.join(this.packageName, 'services', this.fileName + '-service'),
				this.moduleNamespace
			);
		}
	}
});

module.exports = ServiceGenerator;
