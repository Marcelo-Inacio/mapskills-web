/*
* Directive to simulate a lazy loading when the scrollbar hits the bottom of the element
*
* @author Bruno Santos <bruno.santos@focusnetworks.com.br>
* @since 23 Jun 2017
*/
(function() {
    "use strict";

    angular
    .module("mapskillsWeb")
    .directive("lazyLoad", lazyLoad);

    /* @ngInject */
    function lazyLoad() {
        var directive = {
            restrict: "A",
            scope: {
                lazyLoad: "&"
            },
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            var scroller = el[0];

            $(scroller).bind("scroll", function() {
                if (scroller.scrollTop + scroller.offsetHeight >= scroller.scrollHeight) {
                    scope.lazyLoad();
                }
            })
        }
    }
})();
