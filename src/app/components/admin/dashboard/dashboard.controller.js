(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminDashboardController', AdminDashboardController);

	/** @ngInject */
	function AdminDashboardController(toastr, adminService) {
		var vm = this;

		init();

		function init() {
			adminService.validateProfile();
		}
		vm.labels = ["Finalizados", "Não Finalizados"];
		vm.array = [{"level":"Fatec","values":[80, 20]},
								{"level":"Etec","values":[57, 43]}]
	}

})();
