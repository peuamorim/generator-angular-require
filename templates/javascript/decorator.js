define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name <%= scriptAppName %>.decorator:<%= classedName %>
   * @description
   * # <%= classedName %>
   * Decorator of the <%= scriptAppName %>
   */
  angular.module('<%= scriptAppName %>.<%= moduleName %>.decorators', [])
    .config(function ($provide) {
      $provide.decorator('<%= artifactName %>Decorator', function ($delegate) {
          // decorate the $delegate
          return $delegate;
      });
    });
});
