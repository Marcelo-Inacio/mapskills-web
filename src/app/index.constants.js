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
      STUDENTS: HOST.SERVER + 'institution/students',
      COURSES: HOST.SERVER + 'institution/{code}/courses',
      BY_ID: HOST.SERVER + 'institution/{id}',
      ALL: HOST.SERVER + 'institutions',
      UPDATE: HOST.SERVER + 'institution/{id}',
      UPDATE_THEME: HOST.SERVER + 'institution/{code}/theme',
      SAVE: HOST.SERVER + 'institution',
      UPLOAD: HOST.SERVER + 'institution/upload',
      COURSE: HOST.SERVER + 'institution/course'
    },
    THEME: {
      ALL: HOST.SERVER + 'game/themes',
      BY_ID: HOST.SERVER + 'game/theme/{id}',
      UPDATE: HOST.SERVER + 'game/theme/{id}',
      SAVE: HOST.SERVER + 'game/theme',
      UPDATE_STATUS: HOST.SERVER + 'game/{id}',
      UPDATE_SCENES: HOST.SERVER + 'game/{themeId}/scenes',
      DELETE_QUESTION: HOST.SERVER + 'game/{themeId}/scene/{sceneId}/question',
      DELETE_SCENE: HOST.SERVER + 'game/{themeId}/scene/{sceneId}'
    },
    SCENE: {
      SAVE: HOST.SERVER + 'game/{themeId}/scene',
      UPDATE: HOST.SERVER + 'game/{themeId}/scene/{sceneId}',
      getRestContext: _sceneRestContext
    },
    SKILL: {
      ALL: HOST.SERVER + 'skills',
      SAVE: HOST.SERVER + 'skill',
      UPDATE: HOST.SERVER + 'skill/{id}'
    },
    REPORT: {
      SHOW: HOST.REPORT + 'report/student',
      DOWNLOAD: HOST.REPORT + 'report/download',
      GLOBAL: HOST.REPORT + 'report/institution-level',
      LOCAL: HOST.REPORT + 'report/institution',
      COURSE: HOST.REPORT + 'report/institution-courses'
    },
    STUDENT: {
      SCENE: HOST.SERVER + 'student/{id}/scene',
      ANSWER: HOST.SERVER + 'student/game/answer',
      RESULT: HOST.REPORT + 'report/student/{studentId}',
      UPLOAD: HOST.REPORT + 'students',
      POST: HOST.REPORT + 'student',
      PUT: HOST.REPORT + 'student/{id}',
    },
    USER: HOST.SERVER + 'user'
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
