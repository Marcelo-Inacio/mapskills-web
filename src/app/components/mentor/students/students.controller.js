(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorStudentController', MentorStudentController);

	/** @ngInject */
	function MentorStudentController($log, toastrService, mentorService, modalService, downloadService) {
		var vm = this;
		vm.allStudents = null;
		vm.headerTable = [{label: "Nome", model: "name"}, {label: "RA", model: "ra"},
											{label: "Curso", model: "course"}, {label: "Concluído", model: "completed"},
											{label: "Ação", model: "action"}];

    init();

    function init() {
			mentorService.validateProfile();
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
			if(!validateStudent(student)) {
				toastrService.showToastr(400);
				return;
			}
      mentorService.saveStudent(student).then(function(status) {
				postVerify(status);
				loadAllStudents(true);
			});
    }

		vm.sendFile = function(file) {
      mentorService.sendFile(file).then(function(status) {
				postVerify(status);
			});
    }
/** verifica o status da requisição para o retorno
dos funções saveStudent e sendFile */
		function postVerify(status) {
			if(status == 200) {
				$log.log('status '+ status);
				vm.closeModal();
			}
			toastrService.showToastr(status);
		}

		function validateStudent(student) {
			if(angular.isUndefined(student) || student === null || angular.isUndefined(student.name) || angular.isUndefined(student.ra) || angular.isUndefined(student.username)) {
				return false;
			}
			if(student.name && student.ra.length === 13 && student.phone && student.username) {
				return true;
			}
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
