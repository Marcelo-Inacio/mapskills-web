/*
* Directiva para filtros de busca por intervalo de data.
*
* @author Marcelo Inacio
* @since 11 Feb 2018
*/
(function() {
    "use strict";

    angular
    .module("mapskillsWeb")
    .directive("dateRangeFilter", dateRangeFilter);

    /* @ngInject */
    function dateRangeFilter() {
        var directive = {
          templateUrl: 'app/shared/directive/date-range-filter.html',
          restrict: "AE",
          replace: true,
          scope: {
            startDate: "=",
            endDate: "=",
            text: "=",
            search: "&"
          }
        };
        return directive;
    }
})();
