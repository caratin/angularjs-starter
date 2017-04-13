(function () {
  'use strict';
  angular
    .module('angularjs-starter', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'chart.js',
      'ngProgress',
      'ui.router',
      'ui.bootstrap',
    ])
    .constant('constants', {
      'version': {
        'number': '1.0.0'
      },
      'env': {
        'local': {
          'url': 'http://localhost:1234',
          'isDebug': true
        },
        'dev': {
          'url': 'http://localhost:1235',
          'isDebug': true
        },
        'qa': {
          'url': 'http://localhost:1236',
          'isDebug': false
        },
        'uat': {
          'url': 'http://localhost:1237',
          'isDebug': false
        },
        'prod': {
          'url': 'http://localhost:1238',
          'isDebug': false
        },
        'current': 'local'
      }
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    })
    .config(function (ChartJsProvider) {
      ChartJsProvider.setOptions({
        colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
      });
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
