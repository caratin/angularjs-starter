(function () {
  'use strict';
  angular
    .module('angularjs-starter', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch'
    ])
    .constant('constants', {
      'version': {
        'number': '1.0.0'
      }
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    })
    .config(function ($urlRouterProvider, $stateProvider) {
      // default route
      $urlRouterProvider.otherwise("/");

      // ui router states
      $stateProvider
        .state('main', {
          url: "/",
          views: {
            content: {
              templateUrl: 'views/home.html',
              controller: 'HomeController'
            }
          }
        });

    })
    .run(function () {
      // app starts here
    });

})();
