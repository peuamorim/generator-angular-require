define(['./module'], function (module) {
    'use strict';

    /**
     * @ngdoc service
     * @name <%= scriptAppName %>.<%= cameledName %>
     * @description
     * # <%= cameledName %>
     * Service in the <%= scriptAppName %>.
     */
        module.service('<%= artifactName %>Service', ['$resource',
            function ($resource) {
                return $resource('/my/rest-url', {id: '@id', action: '@action'}, {
                    show: {method: 'GET'},
                    list: {method: 'GET', isArray: true},
                    create: {method: 'POST'},
                    update: {method: 'PUT'},
                    delete: {method: 'DELETE'}
                });
            }]);
});
