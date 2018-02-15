(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('CourseModalController', CourseModalController);

	/** @ngInject */
	function CourseModalController(modalService, mentorService, toastrService) {
		var vm = this;
		vm.allPeriods = ["MORNING", "AFTERNOON", "NIGHTLY", "EAD"];
    vm.course = modalService.getResult();

    vm.saveCourse = function(course) {
      mentorService.saveCourse(course).then(function(response) {
        toastrService.showToastr(response.status);
				modalService.okModal();
      });
    }

    vm.closeModal = function() {
      modalService.closeModal();
    }

	}
})();
