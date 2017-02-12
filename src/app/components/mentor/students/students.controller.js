(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorStudentController', MentorStudentController);

	/** @ngInject */
	function MentorStudentController($log, toastrService, mentorService, modalService) {
		var vm = this;
		vm.allStudents = null;

    init();

    function init() {
			loadAllStudents(true);
			loadAllCourses();
      vm.student = mentorService.getObjectCurrent();
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
      modalService.openModal('/app/components/mentor/students/student.modal.html', 'MentorStudentController');
		}

		vm.openDetailsModal = function(student) {
      mentorService.setObjectCurrent(student);
      modalService.openModal('/app/components/mentor/students/details.modal.html', 'MentorStudentController');
		}

		vm.openFileModal = function() {
      modalService.openModal('/app/shared/modal/file.modal.html', 'MentorStudentController');
		}

    vm.saveStudent = function(student) {
      mentorService.saveStudent(student).then(function(status) {
				postVerify(status);
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
			if(status === 200) {
				loadAllStudents(true);
			}
			toastrService.showToastr(status);
			vm.closeModal();
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
