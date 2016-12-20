(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .directive('acmeSidebar', acmeSidebar);

  /** @ngInject */
  function acmeSidebar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/shared/sidebar/sidebar.html',
      scope: {
          creationDate: '='
      },
      controller: SidebarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SidebarController(moment, $location) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
      vm.user;

      vm.ngclass = [{dashboardClass : "active"},
                    {institutionsClass : ""},
                    {themesClass : ""},
                    {skillsClass : ""},
                    {studentsClass : ""},
                    {statisticsClass : ""}];

    /**
     * função para ativação do class dos botões de navegação.
     */
     vm.goPage = function(page) {
       var lastPage = StorageHelper.getItem('page');
       StorageHelper.setItem('page', page);
       vm.ngclass[lastPage+"Class"] = "";
       vm.ngclass[page+"Class"] = "active";
       $location.path('/'+page);
     }

     vm.goPage("dashbord");
    }
  }

})();
