(function () {
    'use strict';
    angular.module('angularjs-starter')
        .controller('HeaderController', function () {

            $($('.hamburger').parent().attr('data-target')).on('hide.bs.collapse', function () {
                $(this).parent().find('.hamburger').removeClass('hamburger--close');
            });
            $($('.hamburger').parent().attr('data-target')).on('show.bs.collapse', function () {
                $(this).parent().find('.hamburger').addClass('hamburger--close');
            });

        });
})();