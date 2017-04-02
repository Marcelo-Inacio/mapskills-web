(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorStudentController', MentorStudentController);

	/** @ngInject */
	function MentorStudentController($log, toastrService, mentorService, modalService, downloadService, Session, HelperService) {
		var vm = this;
		vm.allStudents = null;
		vm.isTechnical;
		vm.headerTable = [{label: "Nome", model: "name"}, {label: "RA", model: "ra"},
											{label: "Curso", model: "course"}, {label: "Concluído", model: "completed"},
											{label: "Ação", model: "action"}];

    init();

    function init() {
			mentorService.validateProfile();
			vm.isTechnical = Session.refreshUserSession().institutionLevel === "TECHNICAL";
			loadAllStudents(true);
			loadAllCourses();
      vm.student = mentorService.getObjectCurrent();
			$log.log(vm.student);
			mentorService.setObjectCurrent(null);
    }

		function loadAllStudents(loadFromServer) {
			mentorService.loadAllStudents(loadFromServer).then(function(response) {
				vm.allStudents = response;
			});
		}

		function loadAllCourses() {
			mentorService.loadAllCourses().then(function(response) {
				vm.allCourses = response;
			});
		}

    vm.openStudentModal = function(student) {
      mentorService.setObjectCurrent(student);
      modalService.openModal('app/components/mentor/students/student.modal.html', 'MentorStudentController');
		}

		vm.openDetailsModal = function(student) {
      mentorService.setObjectCurrent(student);
      modalService.openModal('app/components/mentor/students/details.modal.html', 'MentorStudentController');
		}

		vm.openFileModal = function() {
      modalService.openModal('app/shared/modal/file.modal.html', 'MentorStudentController');
		}

		vm.downloadTemplate = function() {
			downloadService.template("student.xlsx");
		}

    vm.saveStudent = function(student) {
			if(vm.isTechnical && !HelperService.isUndefinedOrNull(student)) {
				student.ra = angular.copy(formatterRA(student));
			}
			if(validateStudent(student)) {
				toastrService.showToastr(400);
				student.ra = "";
				return;
			}
      mentorService.saveStudent(student).then(function(response) {
				vm.allStudents.push(response.data);
				postVerify(response.status);
				loadAllStudents(true);
			});

    }

		vm.sendFile = function(file) {
      mentorService.sendFile(file).then(function(response) {
				vm.allStudents = response.data;
				postVerify(response.status);
			});
    }
/** verifica o status da requisição para o retorno
dos funções saveStudent e sendFile */
		function postVerify(status) {
			if(status === 200) {
				vm.closeModal();
			}
			toastrService.showToastr(status);
		}

		function validateStudent(student) {
			return (HelperService.isUndefinedOrNull(student) || HelperService.isUndefinedOrNull(student.name) ||
				HelperService.isUndefinedOrNull(student.ra) || HelperService.isUndefinedOrNull(student.username) ||
				HelperService.isUndefinedOrNull(student.phone) || student.ra.length < 13);
		}
//função responsavel por preparar o RA caso seja um aluno da ETEC
		function formatterRA(student) {
			if(HelperService.isUndefinedOrNull(student) || HelperService.isUndefinedOrNull(vm.courseSelected)) {
				return "";
			}
			var year = new Date().getFullYear().toString().substring(2);
			var semester = new Date().getMonth() < 6 ? 1 : 2;
			var raFormatted = vm.courseSelected.institutionCode + vm.courseSelected.code + year + semester + student.ra;
			return raFormatted;
		}

		vm.orderBy = function(field) {
			$log.log(field);
			vm.orderList = field.model;
			vm.orderDirection = !vm.orderDirection;
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
