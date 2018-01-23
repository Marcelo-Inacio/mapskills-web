(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorDashboardController', MentorDashboardController);

	/** @ngInject */
	function MentorDashboardController($log, mentorService, loginService) {
		var vm = this;
    vm.courses;
		vm.filter;
		vm.labels = ["Finalizados", "Não Finalizados"];
		vm.options = {
			tooltipCaretSize: 0,
			responsive: true
		}

		init();

    function init() {
			mentorService.validateProfile();
			var institutionCode = loginService.getUserLogged().institutionCode;
			mentorService.loadCourseIndicators(institutionCode).then(function(response) {
				vm.courses = response;
			});
    }

		vm.search = function() {
			console.log(vm.filter);
		}

	}
})();
