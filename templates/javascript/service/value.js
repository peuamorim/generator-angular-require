define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= scriptAppName %>.<%= cameledName %>
   * @description
   * # <%= cameledName %>
   * Value in the <%= scriptAppName %>.
   */
  angular.module('<%= scriptAppName %>.<%= moduleName %>.services', [])
      .directive('<%= artifactName %>Value', function () {
});
