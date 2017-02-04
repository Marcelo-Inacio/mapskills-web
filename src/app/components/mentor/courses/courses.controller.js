(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('CourseController', CourseController);

	/** @ngInject */
	function CourseController($log, toastrService, mentorService, modalService, loginService) {
		var vm = this;
		vm.periodSelected = null;
		vm.allPeriods = ["MATUTINO", "VESPERTINO", "NOTURNO", "EaD"];

    init();

    function init() {
			loadAllCourses(false);
			if(mentorService.getObjectCurrent()) {
				vm.course = mentorService.getObjectCurrent();
				vm.periodSelected = vm.course.period;
				mentorService.setObjectCurrent(null);
			}
    }

		function loadAllCourses(loadFromServer) {
			mentorService.loadAllCourses(loadFromServer).then(function(response) {
				vm.allCourses = response;
			});
		}

    vm.openCourseModal = function(course) {
      mentorService.setObjectCurrent(course);
      modalService.openModal('/app/components/mentor/courses/course.modal.html', 'CourseController');
		}

    vm.saveCourse = function(course) {
			course.institutionCode = loginService.getUserLogged().institutionCode;
      mentorService.saveCourse(course).then(function(status) {
				if(status == 200) {
					loadAllCourses(true);
				}
				toastrService.showToastr(status);
				vm.closeModal();
			});
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
