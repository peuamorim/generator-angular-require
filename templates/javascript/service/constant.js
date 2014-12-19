define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= scriptAppName %>.<%= cameledName %>
   * @description
   * # <%= cameledName %>
   * Constant in the <%= scriptAppName %>.
   */
  angular.module('<%= scriptAppName %>.<%= moduleName %>.services', [])
      .constant('<%= artifactName %>Constant', 42);

});
