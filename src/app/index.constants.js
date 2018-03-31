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
    ENGINE: 'http://localhost:8081/',
    REPORT: 'http://localhost:8083/'
  };

  var API_SERVER = {
    HOST: HOST.ENGINE,
    LOGIN: HOST.ENGINE + 'login',
    INSTITUTION: {
      STUDENTS: HOST.ENGINE + 'institution/students',
      COURSES: HOST.ENGINE + 'institution/{code}/courses',
      BY_ID: HOST.ENGINE + 'institution/{id}',
      ALL: HOST.ENGINE + 'institutions',
      UPDATE: HOST.ENGINE + 'institution/{id}',
      UPDATE_THEME: HOST.ENGINE + 'institution/{code}/theme',
      SAVE: HOST.ENGINE + 'institution',
      UPLOAD: HOST.ENGINE + 'institutions',
      COURSE: HOST.ENGINE + 'institution/course'
    },
    THEME: {
      ALL: HOST.ENGINE + 'game/themes',
      BY_ID: HOST.ENGINE + 'game/theme/{id}',
      UPDATE: HOST.ENGINE + 'game/theme/{id}',
      SAVE: HOST.ENGINE + 'game/theme',
      UPDATE_STATUS: HOST.ENGINE + 'game/{id}',
      UPDATE_SCENES: HOST.ENGINE + 'game/{themeId}/scenes',
      DELETE_QUESTION: HOST.ENGINE + 'game/{themeId}/scene/{sceneId}/question',
      DELETE_SCENE: HOST.ENGINE + 'game/{themeId}/scene/{sceneId}'
    },
    SCENE: {
      SAVE: HOST.ENGINE + 'game/{themeId}/scene',
      UPDATE: HOST.ENGINE + 'game/{themeId}/scene/{sceneId}',
      getRestContext: _sceneRestContext
    },
    SKILL: {
      ALL: HOST.ENGINE + 'skills',
      SAVE: HOST.ENGINE + 'skill',
      UPDATE: HOST.ENGINE + 'skill/{id}'
    },
    REPORT: {
      SHOW: HOST.REPORT + 'report/student',
      DOWNLOAD: HOST.REPORT + 'report/download',
      GLOBAL: HOST.REPORT + 'report/institution-level',
      LOCAL: HOST.REPORT + 'report/institution',
      COURSE: HOST.REPORT + 'report/institution-courses'
    },
    STUDENT: {
      SCENE: HOST.ENGINE + 'student/{id}/scene',
      ANSWER: HOST.ENGINE + 'student/game/answer',
      RESULT: HOST.REPORT + 'report/student/{studentId}',
      UPLOAD: HOST.ENGINE + 'students',
      POST: HOST.ENGINE + 'student',
      PUT: HOST.ENGINE + 'student/{id}'
    },
    USER: HOST.ENGINE + 'user'
  };

  function _sceneRestContext (scene) {
    var restContext = {method: null, url: null};
    if (scene.id) {
      restContext.method = "PUT";
      restContext.url = API_SERVER.SCENE.UPDATE.replace("{themeId}", scene.gameThemeId).replace("{sceneId}", scene.id);
    } else {
      restContext.method = "POST";
      restContext.url = API_SERVER.SCENE.SAVE.replace("{themeId}", scene.gameThemeId);
    }
    return restContext;
  }

  angular
    .module('mapskillsWeb')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('application', application)
    .constant('HTTP_STATUS', HTTP_STATUS)
    .constant('AUTH_EVENTS', AUTH_EVENTS)
    .constant('API_SERVER', API_SERVER);

})();
