(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ReportController', ReportController);

	/** @ngInject */
	function ReportController(adminService, Session, HelperService, reportService, toastr, $uibModal) {
		var vm = this;
		var page = {nextPage: 0, size: 40, isLast: false};
		vm.template = 'app/shared/report/template/card.view.html';
    vm.isAdmin = true;
    vm.filter = {institutionLevel: null, institutionCode: null, courseCode: null, startDate: null, endDate: null};
    vm.institutions = [];
    vm.institutionSelected;
    vm.courseSelected;

    vm.report = {};

		function init() {
			var userLogged = Session.refreshUserSession();
			vm.isAdmin = isAdmin(userLogged);
			if (vm.isAdmin) {
				adminService.loadAllInstitutions(true).then(function(response) {
					angular.copy(response, vm.institutions);
				});
			} else {
				vm.getInstitutionCourses(userLogged.institution.id);
			}
		}
		/**
		 * Chama do serviço de download com condicionais do filtro.
		 */
    vm.download = function() {
			reportService.download(getFilter());
    }
		/**
		 * Realiza chamada para busca do relatório.
		 */
    vm.search = function(clearCache) {
			if (clearCache) {
				page.nextPage = 0;
				page.isLast = false;
			}
			reportService.search(getFilter(), clearCache, page).then(function success(response) {
				page.nextPage++;
				page.isLast = response.remainingPages <= 0;
				vm.students = angular.copy(response.students);
			}, function error() {
				toastr.error("Problema ao tentar buscar relatório.", ":\\");
			});
    }

		vm.getInstitutionCourses = function(id) {
			if (angular.isUndefined(id)) {
				return;
			}
			adminService.getInstitutionDetails(id).then(function(response) {
				vm.institutionSelected = angular.copy(response);
			});
		}

		vm.loadMoreStudents = function() {
			vm.search(false);
		}

		/**
		 * Responsavel por manipular o modal com os resultados do aluno selecionado.
		 */
		vm.studentResult = function(student) {
			$uibModal.open({
				animation: true,
				templateUrl: 'app/shared/report/modal/report.modal.html',
				controllerAs: 'vm',
				controller: function($uibModalInstance) {
					var vm = this;
					vm.skills = [];
					vm.data = [];
					vm.series = ['Valor minímo', 'Valor máximo', 'Valor do aluno'];
					vm.student = student;
					vm.options = {
						legend: {	display: true }
					};

					(function init() {
						var values = [];
						var minimumValues = [];
						var maxValues = [];
						angular.forEach(vm.student.skillResult, function(skill) {
							minimumValues.push(0);
							maxValues.push(20);
							vm.skills.push(skill.skill);
							values.push(skill.value);
						});
						vm.data.push(minimumValues);
						vm.data.push(maxValues);
						vm.data.push(values);
					})();

					vm.close = function () {
						$uibModalInstance.dismiss('cancel');
					}
				},
				size: 'md'
			});
		}
    /**
		 * Retorna filtro para realização da pesquisa ou download do csv
		 */
    var getFilter = function() {
			var filter = {
				institutionLevel: vm.institutionSelected == null ? null : angular.copy(vm.institutionSelected.level),
				institutionCode: vm.institutionSelected == null ? null : angular.copy(vm.institutionSelected.code),
				courseCode: vm.courseSelected == null ? null : angular.copy(vm.courseSelected.code),
				startYear: getYear(vm.filter.startDate),
				startSemester: getSemester(vm.filter.startDate),
				endYear: getYear(vm.filter.endDate),
				endSemester: getSemester(vm.filter.endDate),
				page: page.nextPage,
				size: page.size
			};

			return filter;
    }

		var isAdmin = function(user) {
			return user.profile === "ADMINISTRATOR";
		}

		var getYear = function(filterDate) {
			return filterDate == null || filterDate.length < 5 ? null : filterDate.substring(0, 4);
		}

		var getSemester = function(filterDate) {
			return filterDate == null || filterDate.length < 5 ? null : filterDate.substring(4);
		}

		init();

	}

})();
