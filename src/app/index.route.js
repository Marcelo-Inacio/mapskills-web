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
        templateUrl: 'app/components/student/game.view.html',
        controller: 'StudentController',
        controllerAs: 'studentCtrl'
      })
      .state('student.results', {
        url: '/student/results',
        templateUrl: 'app/components/student/results.view.html',
        controller: 'StudentResultsController',
        controllerAs: 'stuResultCtrl'
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
      });

    $urlRouterProvider.otherwise('/admin/skills');
  }

})();
