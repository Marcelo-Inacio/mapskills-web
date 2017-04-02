(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ReportController', ReportController);

	/** @ngInject */
	function ReportController($log, adminService, Session, HelperService, reportService) {
		var vm = this;
    vm.isAdmin = true; //DONE recuperar perfil do usuário
    vm.filter = {level: null, institutionCode: null, courseCode: null, startDate: null, endDate: null};
    //DONE recuperar todas instituições com seus cursos caso ADMIN ou somente a do usuário caso MENTOR
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
				vm.getInstitutionCourses(userLogged.institutionId);
			}
		}

    vm.download = function() {
      //chama do serviço de downloadService passando o filter
      //ver projeto CHE como exemplo
      fillFilter();
			reportService.download(vm.filter);
    }
//faz uma busca na base de dados, e como criterio utiliza o filtro
//configurado.
    vm.search = function() {
      $log.log("search");
      fillFilter();
			reportService.search(vm.filter).then(function(response) {
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
			vm.filter["startDate"] = vm.filter.startDate === "" ? null : angular.copy(vm.filter.startDate);
			vm.filter["endDate"] = vm.filter.endDate === "" ? null : angular.copy(vm.filter.endDate);
    }

		var verifyIsAdmin = function(user) {
			return user.profile === "ADMINISTRATOR";
		}

		init();

	}

})();
