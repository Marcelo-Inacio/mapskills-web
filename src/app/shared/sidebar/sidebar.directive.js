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
    function SidebarController(moment, $location, $state, storageService) {
      var vm = this;

      vm.ngClass = [{dashboardClass : "active"},
                    {institutionsClass : ""},
                    {themesClass : ""},
                    {skillsClass : ""},
                    {studentsClass : ""},
                    {statisticsClass : ""}
                  ];

    /**
     * função para ativação do class dos botões de navegação.
     */
     vm.goPage = function(page) {
       var lastPage = storageService.getItem('page');
       storageService.setItem('page', page);
       vm.ngClass[lastPage+"Class"] = "";
       vm.ngClass[page+"Class"] = "active";
       //$location.path('/'+page);
       $state.go('^.' + page);
     }

     //vm.goPage("skills");
    }
  }

})();
