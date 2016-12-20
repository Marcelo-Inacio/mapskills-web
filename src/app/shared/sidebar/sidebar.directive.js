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
    function SidebarController(moment) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
      vm.goPage = _goPage;
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
			  	function _goPage (page) {
  			  		var lastPage = StorageHelper.getItem('page');
  			  		StorageHelper.setItem('page', page);
  			  		vm.ngclass[lastPage+"Class"] = "";
  			  		vm.ngclass[page+"Class"] = "active";
  			  		document.location.href = '#/' + page;
			  	}

			  	_goPage("dashbord");
    }
  }

})();
