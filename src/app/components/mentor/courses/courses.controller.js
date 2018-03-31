(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('CourseController', CourseController);

	/** @ngInject */
	function CourseController($log, toastrService, mentorService, modalService) {
		var vm = this;
		vm.image = "assets/images/image_unavailable.png"; //Recomendado 250x220
		vm.periodSelected = null;
		vm.allCourses = [];

		vm.tableHead = ["Codigo", "Nome", "Período", "Ação"];

    init();

    function init() {
			mentorService.validateProfile();
			loadAllCourses();
    }

    vm.openCourseModal = function(course) {
			modalService.setResult(course || buildCourse());
      var modalInstance = modalService.openModal('app/components/mentor/courses/modal/course.modal.html', 'CourseModalController');
			modalInstance.result.then(function () {
				loadAllCourses();
			});
		}

		function loadAllCourses() {
			mentorService.loadAllCourses().then(function(response) {
				vm.allCourses = angular.copy(response);
			});
		}

		function buildCourse() {
			var course = {
				code: null,
				name: null,
				period: null
			};
			return course;
		}

	}

})();
