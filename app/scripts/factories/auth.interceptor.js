  (function () {
    'use strict';
    angular.module('angularjs-starter')
      .factory('authInterceptor', function () {
        return {
          request: function (config) {
            config.headers = config.headers || {};
            return config;
          },
          response: function (response) {

            if (response.status === 401 || response.status === 403) {
              // handle the case where the user is not authenticated
              console.log("not authenticated");
            }

            return response || $q.when(response);
          }
        };
      });
  })();