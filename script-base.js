'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');
var chalk = require('chalk');
var pluralize = require('pluralize');

var ScriptBase = yeoman.generators.NamedBase.extend({
	constructor: function (name) {
		yeoman.generators.NamedBase.apply(this, arguments);

		try {
			this.appname = require(path.join(process.cwd(), 'bower.json')).name;
		}
		catch (e) {
			this.appname = path.basename(process.cwd());
		}

		this.setEnviromentsVars(this.arguments);

		if (typeof this.env.options.appPath === 'undefined') {
			this.env.options.appPath = this.options.appPath;

			if (!this.env.options.appPath) {
				try {
					this.env.options.appPath = this.config.get('appPath');
				} catch (e) {
				}
			}
			this.env.options.appPath = this.env.options.appPath || 'app';
			this.options.appPath = this.env.options.appPath;
		}

		if (typeof this.env.options.testPath === 'undefined') {
			try {
				this.env.options.testPath = require(path.join(process.cwd(), 'bower.json')).testPath;
			} catch (e) {
			}
			this.env.options.testPath = this.env.options.testPath || 'test/spec';
		}

		var sourceRoot = '/templates/javascript';
		this.scriptSuffix = '.js';

		this.sourceRoot(path.join(__dirname, sourceRoot));

		// util.inherits(ScriptBase, yeoman.generators.NamedBase);
	},

	setEnviromentsVars: function(args){
		this.appname = this._.slugify(this._.humanize(this.appname));

		this.scriptAppName = this._.camelize(this.appname) + angularUtils.appName(this);

		this.packageName = this.pascalize(args[0]);
		if (args[1]) {
			this.artifactName = this.pascalize(this.packageName) + this._.classify(args[1]);

			var parts = args[1].split('/');
			this.fileName = this.hyphenize(args[1]);

			var submodule = '';
			if (parts.length > 1) {
				parts = parts.slice(0, parts.length-1);
				for (var i=0; i< parts.length; i++) {
					if (i == 0) {
						parts[i] = this.uncapitalize(parts[i]);
					} else {
						parts[i] = this._.pascalize(parts[i]);
					}
				}

				submodule = parts.join('.');
			}
			var parts = this.options.namespace.split(':');
			var artifactType = parts[parts.length-1];

			if (submodule == '') {
				this.moduleNamespace = this.scriptAppName + '.' + this.packageName + '.' + pluralize(artifactType);
			} else {
				this.moduleNamespace = this.scriptAppName + '.' + this.packageName + '.' + submodule + '.' + pluralize(artifactType);
			}
		}
	},

	appTemplate: function (src, dest) {
		yeoman.generators.Base.prototype.template.apply(this, [
			src + this.scriptSuffix,
			path.join(this.config.get('appPath'), dest.toLowerCase()) + this.scriptSuffix
		]);
	},

	moduleTemplate: function (src, dest) {
		yeoman.generators.Base.prototype.template.apply(this, [
			src + this.scriptSuffix,
			path.join(this.config.get('appPath'), dest.toLowerCase()) + this.scriptSuffix
		]);
	},


	testTemplate: function (src, dest) {
		yeoman.generators.Base.prototype.template.apply(this, [
			src + this.scriptSuffix,
			path.join(this.env.options.testPath, dest.toLowerCase()) + 'Spec' + this.scriptSuffix
		]);
	},

	htmlTemplate: function (src, dest) {
		yeoman.generators.Base.prototype.template.apply(this, [
			src,
			path.join(this.config.get('appPath'), dest.toLowerCase())
		]);
	},

	addScriptToIndex: function (script) {
		try {
			var appPath = this.env.options.appPath;
			var fullPath = path.join(appPath, 'index.html');
			angularUtils.rewriteFile({
				file: fullPath,
				needle: '<!-- endbuild -->',
				splicable: [
					'<script src="scripts/' + script.replace(/\\/g, '/') + '.js"></script>'
				]
			});
		} catch (e) {
			this.log.error(chalk.yellow(
				'\nUnable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n'
			));
		}
	},

	generateSourceAndTest: function (appTemplate, testTemplate, targetDirectory, artifactType) {
		var moduleName = '';
		if (this.options.namespace === 'angular-require:package') {
			this.artifactName = this.packageName + 'Standard';
			this.fileName = 'standard';
			this.moduleNamespace = this.scriptAppName + '.' + this.packageName + '.' + pluralize(artifactType);
			moduleName = 'module';
		} else {
			var parts = this.fileName.split('/');
			parts[parts.length-1] = 'module';
			moduleName = parts.join('/');
		}

		this.appTemplate(appTemplate, path.join('packages', this.packageName, targetDirectory, this.fileName + '-' + artifactType));
		this.moduleTemplate('module', path.join('packages', this.packageName, targetDirectory, moduleName));
	},

	uncapitalize: function (str) {
		str = str == null ? '' : String(str);
		return str.charAt(0).toLowerCase() + str.slice(1);
	},

	pascalize: function (str) {
		str = str == null ? '' : String(str);
		return this.uncapitalize(this._.camelize(str));
	}
});

module.exports = ScriptBase;
