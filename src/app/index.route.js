(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        //url: '',
        templateUrl: 'app/components/main/main.html'
        //controller: 'MainController',
        //controllerAs: 'main'
      })
      .state('home.login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
      .state('home.game', {
        url: '/game',
        templateUrl: 'app/components/student/game.view.html',
        controller: 'StudentController',
        controllerAs: 'studentCtrl'
      })
      .state('home.results', {
        url: '/results',
        templateUrl: 'app/components/student/results.view.html',
        controller: 'StudentResultsController',
        controllerAs: 'stuResultCtrl'
      })
      .state('home.admin', {
        url: '/admin',
        templateUrl: 'app/components/admin/uploadInstitutions.html',
        controller: 'AdminController',
        controllerAs: 'adminCtrl'
      });

    $urlRouterProvider.otherwise('/admin');
  }

})();
