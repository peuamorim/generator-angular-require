define([
	'app'
], function (app) {
	'use strict';

	return app.config(function ($routeProvider) {
		$routeProvider
			.when('/<%= packageName %>/<%= fileName %>', {
				templateUrl: 'views/standard.html',
				controller: '<%= packageName %>StandardCtrl'
			});
	});
});