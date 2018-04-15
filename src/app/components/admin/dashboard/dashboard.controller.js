(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminDashboardController', AdminDashboardController);

	/** @ngInject */
	function AdminDashboardController(toastr, adminService, HelperService) {
		var vm = this;
		vm.indicator = {
			labels: ["Finalizados", "Não Finalizados"],
			fatecs : {values: null},
			etecs: {values: null},
			options : {
				legend: {display: true}
			}
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
			}, function error() {
				toastr.error("Falha ao recuperar resultados");
			});
		}

		function loadResults(response) {
			vm.hasResult.etecs = false;
			vm.hasResult.fatecs = false;
			angular.forEach(response, function(value) {
				var institution = value.level.toLowerCase();
				vm.indicator[institution].values = value.values;
				vm.hasResult[institution] = true;
			});
		}

		init();
	}

})();
