(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorStudentModalController', MentorStudentModalController);

	/** @ngInject */
	function MentorStudentModalController(modalService, mentorService, toastrService, HelperService) {
		var vm = this;
		vm.student = modalService.getResult();

		vm.saveStudent = function(student) {
			if(vm.isTechnical && !HelperService.isUndefinedOrNull(student)) {
				student.ra = angular.copy(formatRA(student));
			}
			if(validateStudent(student)) {
				toastrService.showToastr(400);
				student.ra = "";
				return;
			}
			mentorService.saveStudent(student).then(function(response) {
				toastrService.showToastr(response.status);
				modalService.okModal();
			});
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}

		/*
		* Formata o RA do aluno caso seja um aluno ETEC
		*/
		function formatRA(student) {
			if(HelperService.isUndefinedOrNull(student) || HelperService.isUndefinedOrNull(vm.courseSelected)) {
				return "";
			}
			var year = new Date().getFullYear().toString().substring(2);
			var semester = new Date().getMonth() < 7 ? 1 : 2;
			var raFormatted = vm.courseSelected.institutionCode + vm.courseSelected.code + year + semester + student.ra;
			return raFormatted;
		}

		/*
		*
		*/
		function validateStudent(student) {
			return (HelperService.isUndefinedOrNull(student) || HelperService.isUndefinedOrNull(student.name) ||
				HelperService.isUndefinedOrNull(student.ra) || HelperService.isUndefinedOrNull(student.username) ||
				HelperService.isUndefinedOrNull(student.phone) || student.ra.length < 13);
		}
	}
})();
