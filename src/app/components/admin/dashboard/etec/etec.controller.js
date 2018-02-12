(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminEtecController', AdminEtecController);

	/** @ngInject */
	function AdminEtecController(toastr, adminService, loginService, HelperService) {
		var vm = this;
    vm.series = ['Finalizados', 'Não Finalizados'];
		vm.codes = [];
    vm.data = [];
		vm.etecs = [];
		vm.options = {scales: { xAxes: [{ stacked: true}], yAxes: [{ stacked: true }]}};
		vm.filter = {startDate: new Date(), endDate: new Date()};

		function init() {
			adminService.validateProfile();
			vm.search();
		}

		vm.search = function() {
			adminService.dashboard.level(getFilter()).then(function(response) {
				vm.data = response.data;
				vm.etecs = response.institutions;
				vm.codes = [];
				angular.forEach(vm.etecs, function(value) {
					vm.codes.push(value.code);
				});
			});
		}

		function getFilter() {
			var filterParameter = {
				institutionLevel: "TECHNICAL",
				startYear: HelperService.getFullYear(vm.filter.startDate),
				startSemester: HelperService.getSemester(vm.filter.startDate),
				endYear: HelperService.getFullYear(vm.filter.endDate),
				endSemester: HelperService.getSemester(vm.filter.endDate)
			}
			return filterParameter;
		}

		init();
	}

})();
