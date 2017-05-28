(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('CourseController', CourseController);

	/** @ngInject */
	function CourseController($log, toastrService, mentorService, modalService, loginService) {
		var vm = this;
		vm.periodSelected = null;
		vm.allCourses = [];
		vm.allPeriods = ["MATUTINO", "VESPERTINO", "NOTURNO", "EaD"];
		vm.tableHead = ["Codigo", "Nome", "Período", "Ação"];

    init();

    function init() {
			mentorService.validateProfile();
			loadAllCourses(false);
			if(mentorService.getObjectCurrent()) {
				vm.course = mentorService.getObjectCurrent();
				vm.periodSelected = vm.course.period;
				mentorService.setObjectCurrent(null);
			}
    }

		function loadAllCourses(loadFromServer) {
			mentorService.loadAllCourses(loadFromServer).then(function(response) {
				vm.allCourses = angular.copy(response);
			});
		}

    vm.openCourseModal = function(course) {
      mentorService.setObjectCurrent(course);
      modalService.openModal('app/components/mentor/courses/course.modal.html', 'CourseController');
		}

    vm.saveCourse = function(course) {
			course.institutionCode = loginService.getUserLogged().institutionCode;
      mentorService.saveCourse(course).then(function(response) {
				if(response.status === 201) {
					vm.allCourses.push(response.data);
					loadAllCourses(true);
				}
				toastrService.showToastr(response.status);
				vm.closeModal();
			});
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
