define(['./module'], function (angular) {
	'use strict';

	/**
	 * @ngdoc filter
	 * @name <%= scriptAppName %>.filter:<%= artifactName %>
	 * @function
	 * @description
	 * # <%= artifactName %>
	 * Filter in the <%= scriptAppName %>.
	 */
	module.directive('<%= artifactName %>Filter', function () {
		return function (input) {
			return '<%= artifactName %> filter: ' + input;
		};
	});
});
