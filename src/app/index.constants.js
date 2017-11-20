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
  };

  var HOST = {
    SERVER: 'http://localhost:8081/',
    REPORT: 'http://localhost:8083/'
  };


  var API_SERVER = {
    HOST: HOST.SERVER,
    LOGIN: HOST.SERVER + 'login',
    INSTITUTION: {
      STUDENTS: HOST.SERVER + 'institution/{code}/students',
      COURSES: HOST.SERVER + 'institution/{code}/courses',
      INSTITUTION: HOST.SERVER + 'institution/{id}',
      ALL: HOST.SERVER + 'institutions'
    },
    THEME: {
      ALL: HOST.SERVER + 'game/themes',
      BY_ID: HOST.SERVER + 'game/theme/{id}'
    },
    SKILL: {
      ALL: HOST.SERVER + 'skills'
    },
    REPORT: {
      SHOW: HOST.REPORT + 'report/student',
      DOWNLOAD: HOST.REPORT + 'report/download',
      GLOBAL: HOST.REPORT + 'report/institution-level',
      LOCAL: HOST.REPORT + 'report/institution'
    }
  };

  angular
    .module('mapskillsWeb')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('application', application)
    .constant('HTTP_STATUS', HTTP_STATUS)
    .constant('AUTH_EVENTS', AUTH_EVENTS)
    .constant('API_SERVER', API_SERVER);

})();
