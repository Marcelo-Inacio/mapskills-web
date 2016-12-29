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
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $location, storageService, loginService) {
      var vm = this;

      vm.institution = "CENTRO PAULA SOUZA";

      init();

      vm.getPath = function() {
        return $location.path().toLowerCase();
      }
      /** recupera o usuario logado */
      function init() {
        vm.user = storageService.getItem('user');
      }

      vm.logout = function() {
        loginService.logout();
      }

    }
  }

})();
