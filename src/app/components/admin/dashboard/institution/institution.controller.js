(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminInstitutionController', AdminInstitutionController);

	/** @ngInject */
	function AdminInstitutionController(toastr, adminService, HelperService, $stateParams) {
		var vm = this;
		var levels = {'fatec': {label: 'Fatec', level: 'SUPERIOR'},
			'etec': {label: 'Etec', level: 'TECHNICAL'}
		};
    vm.series = ['Finalizados', 'Não Finalizados'];
		vm.codes = [];
    vm.data = [];
		vm.institutions = [];
		vm.options = {scales: { xAxes: [{ stacked: true}], yAxes: [{ stacked: true }]}};
		vm.filter = {level: null, startDate: new Date(), endDate: new Date()};

		function init() {
			adminService.validateProfile();
			vm.institution = levels[$stateParams.level];
			vm.filter.level = vm.institution.level;
			vm.search();
		}

		vm.search = function() {
			adminService.dashboard.level(getFilter()).then(function success(response) {
				vm.data = response.data;
				vm.institutions = response.institutions;
				vm.codes = [];
				angular.forEach(vm.institutions, function(institution) {
					vm.codes.push(institution.code);
				});
			}, function error() {
				toastr.error("Falha ao recuperar resultados");
			});
		}

		function getFilter() {
			var filterParameter = {
				institutionLevel: vm.filter.level,
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
