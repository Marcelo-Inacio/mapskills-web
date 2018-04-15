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
      vm.labelCentroPaulaSouza = "CENTRO PAULA SOUZA";

      init();

      function init() {
        vm.user = loginService.getUserLogged();
        vm.showMenu = vm.user.profile != 'STUDENT';
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
