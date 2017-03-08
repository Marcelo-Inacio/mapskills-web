(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .factory('ListenerInterceptor', ListenerInterceptor);

    /** @ngInject */
    function ListenerInterceptor($log, $rootScope, $q, Session, HTTP_STATUS, AUTH_EVENTS) {

      $rootScope.$on(UNAUTHORIZED, function (event, data) {
        $log.log("  lstener  **");
      });
    }
})();
