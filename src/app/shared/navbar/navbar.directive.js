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
    function NavbarController(moment, $location, storageService, loginService) {
      var vm = this;
      vm.show_menu;
      vm.label_cps = "CENTRO PAULA SOUZA";

      init();

      /** recupera o usuario logado */
      function init() {
        var path = $location.path().toLowerCase();
        vm.show_menu = ((path == "/login") || (path == "/student/result") || (path == "/student/game"));
        vm.user = storageService.getItem('user');
      }

      vm.logout = function() {
        loginService.logout();
      }
    }
  }

})();
