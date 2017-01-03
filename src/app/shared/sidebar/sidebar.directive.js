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
        //return "app/shared/sidebar/sidebar." + attrs.profile + ".html";
        return "app/shared/sidebar/"+attrs.profile+".html";
      },
      controller: SidebarController,
      controllerAs: 'sbCtrl',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SidebarController(moment, $location, $state, storageService) {
      var vm = this;
      vm.isCollapsed = true;
      vm.changeClass = changeClass;
      vm.ngClass = {dashboard : "",
                    institutions : "",
                    themes : "",
                    skills : "",
                    students : "",
                    statistics : ""};

    init();
    /**
     * função para ativação do class dos botões de navegação.
     */
     function changeClass(page) {
       var lastPage = storageService.getItem('page') || null;
       storageService.setItem('page', page);
       if(lastPage) {
         vm.ngClass[lastPage] = "null";
       }
       vm.ngClass[page] = "active";
       $state.go("^." + page);
     }

     function init() {
       var url = $location.path();
       if(url.indexOf("/admin/theme/") !== -1){
         $state.go("admin.themes");
         return;
       }
       var position = $location.path().lastIndexOf("/");
       vm.changeClass(url.substring(position + 1));
     }

    }
  }

})();
