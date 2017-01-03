(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StatisticsController', StatisticsController);

	/** @ngInject */
	function StatisticsController($log, mentorService) {
		var vm = this;
    vm.courseSelected = null;
    vm.allStudentsByCourses;

		init();

    function init() {
			mentorService.loadAllResultsStudentsByCourse().then(function(response) {
				vm.allStudentsByCourses = response.data;
        vm.cursos = response.data;
        addSlideToShow(vm.cursos);
			});
    }

    /**
		 * Configuração div id=carousel
		 */
		vm.myInterval = null;
		vm.noWrapSlides = true;
		vm.active = 0;

    vm.slides = [];

		function addSlide(course, index) {
			vm.slides.push({
				course: course,
				id: index
			});
		}

    function addSlideToShow(cursos) {
      for (var index = 0; index < cursos.length; index++) {
        addSlide(cursos[index], index);
      }
    }

	}

})();
