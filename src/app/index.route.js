(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
      .state('student', {
        templateUrl: 'app/components/student/student.html'
      })
      .state('student.game', {
        url: '/student/game',
        templateUrl: 'app/components/student/game/game.view.html',
        controller: 'GameController',
        controllerAs: 'gameCtrl'
      })
      .state('student.result', {
        url: '/student/result',
        templateUrl: 'app/components/student/result/result.view.html',
        controller: 'StudentResultsController',
        controllerAs: 'resultCtrl'
      })
      .state('admin', {
        templateUrl: 'app/components/admin/admin.html'
      })
      .state('admin.themes', {
        url: '/admin/themes',
        templateUrl: 'app/components/admin/game_theme/gameThemes.view.html',
        controller: 'GameThemeController',
        controllerAs: 'gthCtrl'
      })
      .state('admin.scenes', {
        url: '/admin/theme/:themeId',
        templateUrl: 'app/components/admin/scenes/scenes.view.html',
        controller: 'ScenesController',
        controllerAs: 'scnCtrl'
      })
      .state('admin.skills', {
        url: '/admin/skills',
        templateUrl: 'app/components/admin/skill/skills.view.html',
        controller: 'SkillController',
        controllerAs: 'skiCtrl'
      })
      .state('admin.institutions', {
        url: '/admin/institutions',
        templateUrl: 'app/components/admin/institution/institutions.view.html',
        controller: 'InstitutionController',
        controllerAs: 'insCtrl'
      })
      .state('mentor', {
        templateUrl: 'app/components/mentor/mentor.html'
      })
      .state('mentor.dashboard', {
        url: '/mentor/dashboard',
        templateUrl: 'app/components/mentor/statisticsStudentByCourse.view.html',
        controller: 'StatisticsController',
        controllerAs: 'stcCtrl'
      })
      .state('mentor.courses', {
        url: '/mentor/courses',
        templateUrl: 'app/components/mentor/courses/courses.view.html',
        controller: 'CourseController',
        controllerAs: 'crsCtrl'
      })
      .state('mentor.students', {
        url: '/mentor/students',
        templateUrl: 'app/components/mentor/students/students.view.html',
        controller: 'MentorStudentController',
        controllerAs: 'stuCtrl'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
