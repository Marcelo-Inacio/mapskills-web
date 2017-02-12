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
      .state('student.profile', {
        url: '/student/profile',
        templateUrl: 'app/components/student/profile/profile.view.html',
        controller: 'StudentProfileController',
        controllerAs: 'profileCtrl'
      })
      .state('admin', {
        templateUrl: 'app/components/admin/admin.html'
      })
      .state('admin.dashboard', {
        url: '/admin/dashboard',
        templateUrl: 'app/components/admin/dashboard/dashboard.view.html',
        controller: 'AdminDashboardController',
        controllerAs: 'admDashCtrl'
      })
      .state('admin.fatec', {
        url: '/admin/dashboard/fatec',
        templateUrl: 'app/components/admin/dashboard/fatec/fatec.view.html',
        controller: 'AdminFatecController',
        controllerAs: 'fatecCtrl'
      })
      .state('admin.etec', {
        url: '/admin/dashboard/etec',
        templateUrl: 'app/components/admin/dashboard/etec/etec.view.html',
        controller: 'AdminEtecController',
        controllerAs: 'etecCtrl'
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
        templateUrl: 'app/components/mentor/dashboard/dashboard.view.html',
        controller: 'MentorDashboardController',
        controllerAs: 'mentorDashCtrl'
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
      })
      .state('mentor.themes', {
        url: '/mentor/themes',
        templateUrl: 'app/components/mentor/theme/theme.view.html',
        controller: 'MentorThemeController',
        controllerAs: 'theCtrl'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
