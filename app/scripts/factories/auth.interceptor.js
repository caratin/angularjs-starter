(function () {
  'use strict';
  angular.module('angularjs-starter')
    .factory('authInterceptor', function ($q) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          return config;
        },
        response: function (response) {
          return response || $q.when(response);
        },
        responseError: function (errorResponse) {
          switch (errorResponse.status) {
            case 400:
              // BAD REQUEST
              break;
            case 401:
              // UNAUTHORIZED
              break;
            case 403:
              // FORBIDDEN 
              break;
            case 404:
              // NOT FOUND
              break;
          }
          return $q.reject(errorResponse);
        }
      };
    });
})();