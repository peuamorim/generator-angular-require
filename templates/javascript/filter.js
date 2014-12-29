define(['./module'], function (module) {
	'use strict';

	/**
	 * @ngdoc filter
	 * @name <%= scriptAppName %>.filter:<%= artifactName %>
	 * @function
	 * @description
	 * # <%= artifactName %>
	 * Filter in the <%= scriptAppName %>.
	 */
	module.filter('<%= artifactName %>Filter', function () {
		return function (input) {
			return '<%= artifactName %> filter: ' + input;
		};
	});
});
