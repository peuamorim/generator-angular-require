/*jshint unused: vars */
define(['angular']/*packageIncludes*/, function (angular)/*invoke*/ {
	'use strict';

	return angular
		.module('<%= scriptAppName %>.<%= packageName %>', [/*packageDeps*/<%= angularModules %>])
		.config(function ($routeProvider) {
			$routeProvider
				.otherwise({});
		});
});