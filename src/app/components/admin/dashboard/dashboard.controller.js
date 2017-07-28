(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminDashboardController', AdminDashboardController);

	/** @ngInject */
	function AdminDashboardController(toastr, adminService) {
		var vm = this;
		vm.labels = ["Finalizados", "Não Finalizados"];
		vm.array = new Array(2);
		vm.hasResult = {"Etecs":false, "Fatecs":false};
		init();

		function init() {
			adminService.validateProfile();
			adminService.dashboard.global().then(function(response) {
				loadResults(response);
			});
		}

		function loadResults(response) {
			vm.array = angular.copy(response);
			angular.forEach(vm.array, function(value, key) {
				vm.hasResult[value.level] = true;
			});
		}
	}

})();
