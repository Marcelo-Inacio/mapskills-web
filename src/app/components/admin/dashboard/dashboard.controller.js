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
  	vm.data = [300, 100];
	}

})();
