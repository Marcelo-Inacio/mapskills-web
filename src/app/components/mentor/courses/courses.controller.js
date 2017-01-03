(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('CourseController', CourseController);

	/** @ngInject */
	function CourseController($log, mentorService, modalService, storageService) {
		var vm = this;
		vm.allPeriods = ["Matutino", "Vespertino", "Noturno", "EaD"];

    init();

    function init() {
			mentorService.loadAllCourses().then(function(response) {
				vm.allCourses = response.data;
			});
      vm.course = mentorService.getObjectCurrent();
			mentorService.setObjectCurrent(null);
    }

    vm.openCourseModal = function(course) {
      mentorService.setObjectCurrent(course);
      modalService.openModal('/app/components/mentor/courses/course.modal.html', 'CourseController');
		}

    vm.saveCourse = function(course) {
			course.institutionCode = storageService.getItem('user').profile;
      mentorService.saveCourse(course);
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
