(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .directive('menuNavbar', menuNavbar);

  /** @ngInject */
  function menuNavbar(loginService) {
    var directive = {
      restrict: 'E',
      templateUrl: function() {
        var profile = loginService.getUserLogged().profile == "MENTOR" ? "mentor" : "admin";
        return "app/shared/navbar/menu/" + profile + ".menu.html";
      }
    };

    return directive;

  }

})();
