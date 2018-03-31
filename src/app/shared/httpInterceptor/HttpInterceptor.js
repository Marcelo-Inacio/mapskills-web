(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .factory('HttpInterceptor', HttpInterceptor);

    /** @ngInject */
    function HttpInterceptor($log, $rootScope, $q, Session, cfpLoadingBar, HTTP_STATUS, AUTH_EVENTS) {
      var numLoadings = 0;
      return {
        request: function (config) {
          numLoadings++;
          $rootScope.$broadcast("loader_show");
          config.headers = config.headers || {};
          config.withCredentials = config.withCredentials || true;
          if (Session.hasSession() && (!$rootScope.currentState || !$rootScope.currentState.data || !$rootScope.currentState.data.allowAnonymous)) {
              /*var tokenInfo = Session.token();
              config.headers["Authorization"] = tokenInfo;*/
          }
          return config || $q.when(config);
        },
        requestError: function(request) {
          if (!(--numLoadings)) {
            $rootScope.$broadcast("loader_hide");
          }
          $rootScope.$broadcast({
              401: AUTH_EVENTS.notAuthenticated,
              403: AUTH_EVENTS.notAuthorized
          }[request.status], request);
          return $q.reject(request);
        },
        response: function (response) {
          if ((--numLoadings) === 0) {
            $rootScope.$broadcast("loader_hide");
          }
          if (response.status === 401 || response.status === 403) {
            cfpLoadingBar.complete();
            return $q.reject(response);
          }
          cfpLoadingBar.complete();
          return response || $q.when(response);
        },
        responseError: function (response) {
          cfpLoadingBar.complete();
          if (response.status > 0) {
            $log.info("DESCRIÇÃO DO PROBLEMA \n "
            + "status : " + response.status + "\n "
            + "message : " + response.data.message);
          }
          if (!(--numLoadings)) {
            $rootScope.$broadcast("loader_hide");
          }
          if (response.status == HTTP_STATUS.UNAUTHENTICATED) {
            // toastr.error($filter('translate')('USER_NOT_AUTHENTICATED'));
          }
          $rootScope.$broadcast({
              401: AUTH_EVENTS.notAuthenticated,
              403: AUTH_EVENTS.notAuthorized
          }[response.status], response);
          return $q.reject(response);
        }
      }
    }
})();
