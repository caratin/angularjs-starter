(function () {
  'use strict';
  angular
    .module('angularjs-starter', [
      'ngAnimate',
      'ngCookies',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.router',
      'angular-loading-bar',
      'ngAnimate',
      'cfp.loadingBar'
    ])
    .constant('constants', {
      'version': {
        'number': '1.0.0'
      }
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    })
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
    }])
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
        })
        .state('about', {
          url: "/about",
          views: {
            content: {
              templateUrl: 'views/about.html',
              controller: 'AboutController'
            }
          }
        });

    })
    .run(function ($trace, $transitions) {
      // app starts here
      // $trace.enable('TRANSITION');

      $transitions.onStart({}, function (trans) {
        var progressBar = trans.injector().get('progressBar');
        progressBar.transitionStart();
        trans.promise.finally(progressBar.transitionEnd);
      });
    });

})();
