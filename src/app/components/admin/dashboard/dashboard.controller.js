(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminDashboardController', AdminDashboardController);

	/** @ngInject */
	function AdminDashboardController(toastr, adminService, HelperService) {
		var vm = this;
		vm.labels = ["Finalizados", "Não Finalizados"];
		vm.indicator = {
			fatecs : {values: null},
			etecs: {values: null}
		};
		vm.hasResult = {etecs: false, fatecs: false};
		vm.filter = {startDate: new Date(), endDate: new Date()};

		function init() {
			adminService.validateProfile();
			vm.search();
		}

		vm.search = function() {
			var filterParameter = {
				startYear: HelperService.getFullYear(vm.filter.startDate),
				startSemester: HelperService.getSemester(vm.filter.startDate),
				endYear: HelperService.getFullYear(vm.filter.endDate),
				endSemester: HelperService.getSemester(vm.filter.endDate)
			}
			adminService.dashboard.global(filterParameter).then(function success(response) {
				loadResults(response);
			}, function error(response) {
				toastr.error("Falha ao recuperar resultados");
			});
		}

		function loadResults(response) {
			angular.forEach(response, function(value) {
				var institution = value.level.toLowerCase();
				vm.indicator[institution].values = value.values;
				vm.hasResult[institution] = true;
			});
		}

		init();
	}

})();
