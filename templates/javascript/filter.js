define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc filter
   * @name <%= scriptAppName %>.filter:<%= cameledName %>
   * @function
   * @description
   * # <%= cameledName %>
   * Filter in the <%= scriptAppName %>.
   */
  angular.module('<%= scriptAppName %>.<%= moduleName %>.filters', [])
      .directive('<%= artifactName %>Filter', function () {
      return function (input) {
      	return '<%= artifactName %> filter: ' + input;
      };
  	});
});
