define(['./module'], function (module) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name <%= scriptAppName %>.<%= artifactName %>
	 * @description
	 * # <%= artifactName %>
	 * Factory in the <%= scriptAppName %>.
	 */
	module.factory('<%= artifactName %>Factory', function () {
		// Service logic
		// ...

		var meaningOfLife = 42;

		// Public API here
		return {
			someMethod: function () {
				return meaningOfLife;
			}
		};
	});
});
