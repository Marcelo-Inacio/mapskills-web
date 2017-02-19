(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/shared/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($location, $state, loginService) {
      var vm = this;
      vm.show_menu;
      vm.label_cps = "CENTRO PAULA SOUZA";

      init();

      /** recupera o usuario logado */
      function init() {
        var path = $location.path().toLowerCase();
        vm.show_menu = ((path == "/login") || (path == "/student/result") || (path == "/student/game"));
        vm.user = loginService.getUserLogged();
      }

      vm.details = function() {
        $state.go("^.profile");
      }

      vm.logout = function() {
        loginService.logout();
      }
    }
  }

})();
