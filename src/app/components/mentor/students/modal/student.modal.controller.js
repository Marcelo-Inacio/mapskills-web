(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorStudentModalController', MentorStudentModalController);

	/** @ngInject */
	function MentorStudentModalController(modalService, mentorService, toastrService, HelperService, $filter, Session, loginService) {
		var vm = this;
		vm.isTechnical = Session.refreshUserSession().institution.level === "TECHNICAL";
		vm.student = angular.copy(modalService.getResult());
		loadAllCourses();
		vm.courseSelected = null;
		vm.showPassword = false;
		vm.typePassword = {"true" : "text", "false" : "password"};

		vm.saveStudent = function(student) {
			if (vm.isTechnical) {
				student.ra = angular.copy(formatRA(student));
			}

			mentorService.saveStudent(student).then(function(response) {
				toastrService.showToastr(response.status);
				modalService.okModal();
			});
		}

		vm.updatePassword = function(user) {
      loginService.updatePassword(user.username, user.password).then(function(status) {
        toastrService.showToastr(status);
      });
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

		function loadAllCourses() {
			mentorService.loadAllCourses().then(function(response) {
				vm.allCourses = response;
				prepareStudent();
			});
		}

		/*
		 * Formata o RA do aluno caso seja um aluno ETEC
		 */
		function formatRA(student) {
			if (HelperService.isUndefinedOrNull(student) || HelperService.isUndefinedOrNull(vm.courseSelected)) {
				return "";
			}
			var year = new Date().getFullYear().toString().substring(2);
			var semester = new Date().getMonth() < 7 ? 1 : 2;
			var raFormatted = vm.courseSelected.institutionCode + vm.courseSelected.code + year + semester + student.ra;
			return raFormatted;
		}

		function prepareStudent() {
			if (vm.student != null) {
				vm.student.course.period = $filter('translate')(vm.student.course.period);
			}
			if (vm.isTechnical) {
				vm.student.ra = modalService.getResult().ra.substring(9);
			}
			angular.forEach(vm.allCourses, function(course) {
				if (vm.student != null && vm.student.course.code == course.code) {
					vm.courseSelected = course;
				}
			});
		}
	}
})();
