(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminDashboardController', AdminDashboardController);

	/** @ngInject */
	function AdminDashboardController(toastr, adminService) {
		var vm = this;
		vm.labels = ["Finalizados", "Não Finalizados"];
		vm.array = [];
		init();

		function init() {
			adminService.validateProfile();
			adminService.dashboard.global().then(function(response) {
				vm.array = angular.copy(response);
			});
		}
	}

})();
