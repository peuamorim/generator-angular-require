define([
  'angular'
], function (angular) {
  'use strict';

  return angular.module('<%= scriptAppName %>.<%= moduleName %><%= dot %><%= artifactType %>', []);
});