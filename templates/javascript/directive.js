define(['./module'], function (module) {
	'use strict';
	module.controller('<%= artifactName %>DirectiveCtrl', ['$scope',  function ($scope) {

	}]);

	/**
	 * @ngdoc directive
	 * @name <%= scriptAppName %>.directive:<%= artifactName %>
	 * @description
	 * # <%= artifactName %>
	 */
	module.directive('<%= artifactName %>Directive', function () {
		return {
			templateUrl: 'packages/<%= packageName %>/directives/templates/<%= fileName %>.html',
			controller: '<%= artifactName %>DirectiveCtrl',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				element.text('this is the <%= artifactName %> directive');
			}
		};
	});
});
