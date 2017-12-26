(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorStudentController', MentorStudentController);

	/** @ngInject */
	function MentorStudentController($log, toastrService, mentorService, modalService, downloadService, Session, HelperService) {
		var vm = this;
		var page = {nextPage: 0, size: 20, isLast: false};
		vm.students = null;
		vm.isTechnical;
		vm.filter = {name: null, ra: null, course: {}};
		vm.tableHeader = [{label: "Nome", model: "name", width: {'width': '30%'}},
			{label: "RA", model: "ra", width: {'width': '15%'}},
			{label: "Curso", model: "course", width: {'width': '30%'}},
			{label: "Concluído", model: "completed", width: {'width': '10%'}},
			{label: "Ação", model: "action", width: {'width': '15%'}}];

    init();

    function init() {
			mentorService.validateProfile();
			vm.isTechnical = Session.refreshUserSession().institutionLevel === "TECHNICAL";
			if(!mentorService.getObjectCurrent()) {
				loadStudents(true, false);
				loadAllCourses();
			}
      vm.student = mentorService.getObjectCurrent();
			mentorService.setObjectCurrent(null);
    }

		function loadStudents(loadFromServer, clearCache) {
			mentorService.loadStudents(loadFromServer, vm.filter, clearCache, page).then(function(response) {
				page.nextPage++;
				page.isLast = response.remainingPages <= 0;
				vm.students = response.students;
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
				postVerify(response.status);
				loadStudents(true, true);
			});
    }

		vm.sendFile = function(file) {
      mentorService.sendFile(file).then(function(response) {
				postVerify(response.status);
				loadStudents(true, true);
			});
    }
/** verifica o status da requisição para o retorno
dos funções saveStudent e sendFile */
		function postVerify(status) {
			toastrService.showToastr(status);
			vm.closeModal();
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
			var semester = new Date().getMonth() < 7 ? 1 : 2;
			var raFormatted = vm.courseSelected.institutionCode + vm.courseSelected.code + year + semester + student.ra;
			return raFormatted;
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}

		vm.loadMoreStudents = function() {
			loadStudents(true, false);
		}

		vm.search = function() {
			page.nextPage = 0;
			page.isLast = false;
			vm.filter.course = HelperService.isUndefinedOrNull(vm.filter.course) ? {} : vm.filter.course;
			loadStudents(true, true);
		}
	}
})();
