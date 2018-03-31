(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .directive('acmeSidebar', acmeSidebar);

  /** @ngInject */
  function acmeSidebar() {

    var directive = {
      restrict: 'E',
      templateUrl: function(element, attrs) {
        return "app/shared/sidebar/" + attrs.profile + ".html";
      },
      controller: SidebarController,
      controllerAs: 'sbCtrl',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SidebarController(moment, $location, $state, $stateParams, storageService) {
      var vm = this;
      vm.isCollapsed = true;
      vm.changeClass = changeClass;
      vm.goPage = goPage;
      vm.ngClass = {dashboard : "", institutions : "",
                    themes : "", skills : "",
                    students : "", report : ""};

    init();
    /**
     * função para ativação do class dos botões de navegação.
     */
     function changeClass(page) {
       page = page.indexOf('dashboard') == 0 ? 'dashboard' : page;
       var lastPage = storageService.getItem('page') || null;
       storageService.setItem('page', page);
       if (lastPage) {
         vm.ngClass[lastPage] = "null";
       }
       vm.ngClass[page] = "active";
       goPage(page, null);
     }

     function goPage(page, params) {
       $state.go("^." + page, params);
     }

     function init() {
       var url = $location.path();
       if (url.indexOf("/admin/theme/") !== -1) {
         vm.ngClass["themes"] = "active";
         return $state.go("admin.scenes", $stateParams);
       }
       var position = $location.path().lastIndexOf("/");
       vm.changeClass(url.substring(position + 1));
     }

    }
  }

})();
