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
    function NavbarController($location, $state, $window, loginService) {
      var vm = this;
      vm.show_menu;
      vm.label_cps = "CENTRO PAULA SOUZA";

      init();

      /** recupera o usuario logado */
      function init() {
        var widthBrowser = $window.innerWidth;
        var path = $location.path().toLowerCase();
        vm.show_menu = (((path === "/login") || (path === "/student/result") || (path === "/student/game")) && widthBrowser < 768);
        vm.user = loginService.getUserLogged();
      }

      vm.goPage = function(page) {
        $state.go("^." + page);
      }

      vm.logout = function() {
        loginService.logout();
      }
    }
  }

})();
