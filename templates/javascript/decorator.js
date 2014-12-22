define(['./module'], function (module) {
  'use strict';

  /**
   * @ngdoc function
   * @name <%= scriptAppName %>.decorator:<%= classedName %>
   * @description
   * # <%= classedName %>
   * Decorator of the <%= scriptAppName %>
   */
    module.config(function ($provide) {
      $provide.decorator('<%= artifactName %>Decorator', function ($delegate) {
          // decorate the $delegate
          return $delegate;
      });
    });
});
