'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var DirectiveGenerator = ScriptBase.extend({
	constructor: function (name) {
		ScriptBase.apply(this, arguments);
	},

	createDirectiveFiles: function () {
		this.generateSourceAndTest(
			'directive',
			'spec/directive',
			'directives',
			'directive'
		);

		this.htmlTemplate(
			'../common/app/views/view.html',
			path.join(
				'packages',
				this.packageName,
				'directives',
				'templates',
				this.hyphenize(this.arguments[1]) + '.html'
			)
		);
	},

	//// Re-write the main app module to account for our new dependency
	injectDependenciesToApp: function () {
		angularUtils.injectIntoPackageIncludeFile(
			path.join('app', 'packages', this.packageName, 'app.js'),
			path.join(this.packageName, 'directives', this.fileName + '-directive'),
			this.moduleNamespace
		);
	}
});

module.exports = DirectiveGenerator;
