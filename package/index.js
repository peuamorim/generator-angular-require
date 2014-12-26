'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var PackageGenerator = ScriptBase.extend({
	constructor: function (name) {
		ScriptBase.apply(this, arguments);
	},

	createServiceFiles: function () {
		// constants
		this.generateSourceAndTest(
			'service/constant',
			'spec/service',
			'constants',
			'constant'
		);

		// services
		this.generateSourceAndTest(
			'service/service',
			'spec/service',
			'services',
			'service'
		);

		// controllers
		this.generateSourceAndTest(
			'controller',
			'spec/controller',
			'controllers',
			'controller'
		);

		// filters
		this.generateSourceAndTest(
			'filter',
			'spec/filter',
			'filters',
			'filter'
		);

		// directives
		this.generateSourceAndTest(
			'directive',
			'spec/directive',
			'directives',
			'directive'
		);

		// factory
		this.generateSourceAndTest(
			'service/factory',
			'spec/service',
			'services',
			'service'
		);


		this.htmlTemplate('../common/app/views/view.html', path.join('packages', this.packageName, 'views', 'standard.html'));
		this.appTemplate('route', path.join('packages', this.packageName, 'route'));
		this.appTemplate('packageapp', path.join('packages', this.packageName, 'app'));

	},

	// Re-write the main app module to account for our new dependency
	injectDependenciesToApp: function () {
		//angularUtils.injectIntoFile(
		//	this.config.get('appPath'),
		//	'constants/' + this.name.toLowerCase(),
		//	'',
		//	this.scriptAppName + '.' + this.moduleName + this.dot + 'constants'
		//);
	}
});

module.exports = PackageGenerator;
