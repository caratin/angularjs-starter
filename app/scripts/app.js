(function () {
  'use strict';
  angular
    .module('angularjs-starter', [
      "ngAnimate",
      "ngCookies",
      "ngRoute",
      "ngTouch",
      "ngSanitize",
      "ui.router",
      "angular-loading-bar",
      "ngAnimate",
      "cfp.loadingBar",
      "moment-picker",
      "chart.js",
      "ui.bootstrap",
      "angularMoment",
      "angularFileUpload"
    ])
    .constant('constants', {
      "url": "http://localhost:50560/api/",
      'version': {
        'number': '1.0.0'
      }
    })
    .config(["momentPickerProvider", function (momentPickerProvider) {
      momentPickerProvider.options({
        locale: "pt"
      });
    }])
    .config(function (ChartJsProvider) {
      ChartJsProvider.setOptions("global", {
        colors: ["#2972AB", "#C8785C", "#164479", "#FED049", "#e83e8c", "#949FB1", "#28a745"]
      });
    })
    .config(function ($locationProvider) {
      $locationProvider.html5Mode(true);
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

      var header = {
        templateUrl: "views/header.html",
        controller: "HeaderController"
      };

      // ui router states
      $stateProvider
        .state('main', {
          url: "/",
          views: {
            header: header,
            content: {
              templateUrl: 'views/home.html',
              controller: 'HomeController'
            }
          },
          data: {
            needsAuth: false
          }
        })
        .state('about', {
          url: "/about",
          views: {
            header: header,
            content: {
              templateUrl: 'views/about.html',
              controller: 'AboutController'
            }
          },
          data: {
            needsAuth: false
          }
        });

    })
    .run(function ($trace, $transitions, $window, $rootScope, constants) {

      $rootScope.footer = {
        year: new Date().getFullYear(),
        version: constants.version.number,
        date: null
      };

      // before window closes
      $window.onbeforeunload = function () {};

      $transitions.onStart({}, function (trans) {
        // check here if user is authenticated and redirect if he's not
        // var data = trans.to().data;
        // if (data && data.needsAuth && false) {}
        var progressBar = trans.injector().get('progressBar');
        progressBar.transitionStart();
        trans.promise.finally(progressBar.transitionEnd);
      });

      $transitions.onSuccess({}, function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });

    });
})();