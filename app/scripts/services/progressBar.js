(function () {
    'use strict';
    angular.module('angularjs-starter')
        .service('progressBar', function (cfpLoadingBar) {
            var count = 0;
            return {
                transitionStart: function () {
                    if (++count > 0) {
                        cfpLoadingBar.start();
                    }
                },
                transitionEnd: function () {
                    if (--count <= 0) {
                        cfpLoadingBar.complete();
                    }
                }
            };
        });
})();