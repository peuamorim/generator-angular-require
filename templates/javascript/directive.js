define(['./module'], function (module) {
  'use strict';

  /**
   * @ngdoc directive
   * @name <%= scriptAppName %>.directive:<%= cameledName %>
   * @description
   * # <%= cameledName %>
   */
    module.directive('<%= artifactName %>Directive', function () {
      return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
          element.text('this is the <%= cameledName %> directive');
        }
      };
    });
});
