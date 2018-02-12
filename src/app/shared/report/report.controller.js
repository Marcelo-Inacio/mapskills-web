(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ReportController', ReportController);

	/** @ngInject */
	function ReportController($log, adminService, Session, HelperService, reportService) {
		var vm = this;
    vm.isAdmin = true;
    vm.filter = {level: null, institutionCode: null, courseCode: null, startDate: null, endDate: null};
    vm.institutions = [];
    vm.institutionSelected;
    vm.courseSelected;

    vm.report = {};

		function init() {
			var userLogged = Session.refreshUserSession();
			vm.isAdmin = verifyIsAdmin(userLogged);
			if(vm.isAdmin) {
				adminService.loadAllInstitutions(true).then(function(response) {
					angular.copy(response, vm.institutions);
				});
			} else {
				vm.getInstitutionCourses(userLogged.institution.id);
			}
		}
		/*
		* Chama do serviço de download com condicionais do filtro.
		*/
    vm.download = function() {
      fillFilter();
			reportService.download(vm.filter);
    }
		/*
		* Realiza chamada para busca do relatório.
		*/
    vm.search = function() {
      fillFilter();
			$log.log(vm.filter);
			reportService.search(vm.filter).then(function(response) {
				vm.report = [];
				vm.report = angular.copy(response);
			});
    }

		vm.getInstitutionCourses = function(id) {
			if(angular.isUndefined(id)) {
				return;
			}
			adminService.getInstitutionDetails(id).then(function(response) {
				vm.institutionSelected = angular.copy(response);
			});
		}
    // preenche o filtro para realização da pesquisa ou download do csv
    var fillFilter = function() {
      vm.filter["level"] = HelperService.isUndefinedOrNull(vm.institutionSelected) ? null : angular.copy(vm.institutionSelected.level);
      vm.filter["institutionCode"] = HelperService.isUndefinedOrNull(vm.institutionSelected) ? null : angular.copy(vm.institutionSelected.code);
      vm.filter["courseCode"] = HelperService.isUndefinedOrNull(vm.courseSelected) ? null : angular.copy(vm.courseSelected.code);
			vm.filter["startYear"] = vm.filter.startDate === "" ? null : getYear(vm.filter.startDate);
			vm.filter["endYear"] = vm.filter.startDate === "" ? null : getYear(vm.filter.endDate);
			vm.filter["startSemester"] = vm.filter.endDate === "" ? null : getSemester(vm.filter.startDate);
			vm.filter["endSemester"] = vm.filter.endDate === "" ? null : getSemester(vm.filter.endDate);
			vm.filter["page"] = 0;
			vm.filter["size"] = 50;
    }

		var verifyIsAdmin = function(user) {
			return user.profile === "ADMINISTRATOR";
		}

		var getYear = function(filterDate) {
			return HelperService.isUndefinedOrNull(filterDate) ? "" : filterDate.split("/")[0];
		}

		var getSemester = function(filterDate) {
			return HelperService.isUndefinedOrNull(filterDate) ? "" : filterDate.split("/")[1];
		}

		init();

	}

})();
