define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= scriptAppName %>.<%= cameledName %>
   * @description
   * # <%= cameledName %>
   * Service in the <%= scriptAppName %>.
   */
  angular.module('<%= scriptAppName %>.<%= moduleName %>.services', [])
      .directive('<%= artifactName %>Service', function () {
	// AngularJS will instantiate a singleton by calling "new" on this function
	});
});
