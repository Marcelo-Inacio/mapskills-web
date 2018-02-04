(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .factory('Session', Session);

  /** @ngInject */
  function Session($cookies, application, $rootScope) {
    var createToken = function(tokenInfo) {
        var sessionObj = {
            token: tokenInfo
        };
        $cookies.put(application.authentication.mapskillsCookieKey, angular.toJson(sessionObj));
    };

    var createUser = function(userInfo) {
      var json = $cookies.get(application.authentication.mapskillsCookieKey);
      var sessionObj = angular.fromJson(json);
      sessionObj.user = userInfo;
      $cookies.put(application.authentication.mapskillsCookieKey, angular.toJson(sessionObj));
      this.user = userInfo;
      $rootScope.$broadcast('user:updated', this.user);
    }

    var destroy = function() {
        $cookies.remove(application.authentication.mapskillsCookieKey);
        this.user = null;
    };

    var hasSession = function() {
        return ($cookies.get(application.authentication.mapskillsCookieKey));
    };

    var refreshUserSession = function() {
        if (hasSession()) {
            var json = $cookies.get(application.authentication.mapskillsCookieKey);
            var obj = angular.fromJson(json);
            return obj.user;
        }
        return null;
    };

    var token = function() {
        if (hasSession()) {
            var json = $cookies.get(application.authentication.mapskillsCookieKey);
            var obj = angular.fromJson(json);
            return obj.token;
        }
        return null;
    };

    var userPrivileges = function() {
        if (hasSession()) {
            var json = $cookies.get(application.authentication.mapskillsCookieKey);
            var obj = angular.fromJson(json);
            return obj.user.privileges;
        }
    };
    var service = {
      createToken: createToken,
      createUser: createUser,
      destroy: destroy,
      hasSession: hasSession,
      refreshUserSession: refreshUserSession,
      token: token,
      userPrivileges: userPrivileges
    };
    return service;
  }
})();
