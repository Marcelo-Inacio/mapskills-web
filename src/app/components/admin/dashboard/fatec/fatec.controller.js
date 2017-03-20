(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminFatecController', AdminFatecController);

	/** @ngInject */
	function AdminFatecController(toastr, adminService, loginService) {
		var vm = this;
		vm.series = ['Finalizados', 'Não Finalizados'];
		vm.codes = [];
    vm.data = [];
		vm.fatecs = [];
		vm.options = {scales: { xAxes: [{ stacked: true,}], yAxes: [{ stacked: true }]}};
		init();

		function init() {
			adminService.validateProfile();
			adminService.dashboard.level("SUPERIOR").then(function(response) {
				vm.data = angular.copy(response.data);
				vm.fatecs = angular.copy(response.institutions);
				angular.forEach(vm.fatecs, function(value, key) {
					vm.codes.push(value.code);
				});
			});
		};

	}

})();
