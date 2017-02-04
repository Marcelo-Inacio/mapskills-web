/* global malarkey:false, moment:false */
(function() {
  'use strict';

  var application = {
    config: {
      headers : {
        'Content-Type': 'application/json;charset=utf-8;'
      }
    },
    authentication: {
      url: '/login',
      mapskillsCookieKey: 'mapskills.account.user'
    }
  };

  var HTTP_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHENTICATED: 401,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    PRECONDITION_FAILED: 412,
    INTERNAL_SERVER_ERROR: 500
  };

  var AUTH_EVENTS = {
    loginSuccess: 'authloginsuccess',
    loginFailed: 'authloginfailed',
    logoutSuccess: 'authlogoutsuccess',
    sessionTimeout: 'authsessiontimeout',
    notAuthenticated: 'authnotauthenticated',
    notAuthorized: 'authnotauthorized',
    insufficientPrivileges: 'authinsufficientPrivileges'
  }

  angular
    .module('mapskillsWeb')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('application', application)
    .constant('HTTP_STATUS',HTTP_STATUS)
    .constant('AUTH_EVENTS',AUTH_EVENTS);

})();
