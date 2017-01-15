(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorStudentController', MentorStudentController);

	/** @ngInject */
	function MentorStudentController($log, toastr, mentorService, modalService) {
		var vm = this;
		vm.allStudents = null;

    init();

    function init() {
			loadAllStudents();
			loadAllCourses();
      vm.student = mentorService.getObjectCurrent();
			mentorService.setObjectCurrent(null);
    }

		function loadAllStudents() {
			mentorService.loadAllStudents().then(function(response) {
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
				if(status == 200) {
					loadAllStudents();
					toastr.success('Salvo com sucesso', 'Feito!');
				} else {
					toastr.error('Erro ao tentar salvar.', 'Falha!');
				}
				vm.closeModal();
			});
    }

		vm.sendFile = function(file) {
      mentorService.sendFile(file).then(function(status) {
				if(status == 200) {
					loadAllStudents();
					toastr.success('Salvo com sucesso', 'Feito!');
				} else {
					toastr.error('Erro ao tentar salvar.', 'Falha!');
				}
				vm.closeModal();
			});
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
