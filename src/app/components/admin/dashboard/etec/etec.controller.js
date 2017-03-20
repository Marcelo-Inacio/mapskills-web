(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminEtecController', AdminEtecController);

	/** @ngInject */
	function AdminEtecController(toastr, adminService, loginService) {
		var vm = this;
    vm.series = ['Finalizados', 'Não Finalizados'];
		vm.codes = [];
    vm.data = [];
		vm.etecs = [];
		vm.options = {scales: { xAxes: [{ stacked: true,}], yAxes: [{ stacked: true }]}};
		init();

		function init() {
			adminService.validateProfile();
			adminService.dashboard.level("TECHNICAL").then(function(response) {
				vm.data = angular.copy(response.data);
				vm.etecs = angular.copy(response.institutions);
				angular.forEach(vm.etecs, function(value, key) {
					vm.codes.push(value.code);
				});
			});
		}

	}

})();
