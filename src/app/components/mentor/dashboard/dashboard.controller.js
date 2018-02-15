(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorDashboardController', MentorDashboardController);

	/** @ngInject */
	function MentorDashboardController($log, mentorService, loginService, HelperService) {
		var vm = this;
    vm.courses;
		vm.filter = {startDate: new Date(), endDate: new Date()};
		vm.labels = ["Finalizados", "Não Finalizados"];
		vm.options = {
			tooltipCaretSize: 0,
			responsive: true
		}

    function init() {
			mentorService.validateProfile();
			vm.search();
    }

		vm.search = function() {
			var institutionCode = loginService.getUserLogged().institution.code;
			var params = getFilterParameter(institutionCode, vm.filter.startDate, vm.filter.endDate);
			$log.log(params);
			mentorService.loadCourseIndicators(params).then(function(response) {
				vm.courses = response;
			});
		}

		function getFilterParameter(institutionCode, startDate, endDate) {
			var filterParameter = {
				institutionCode: institutionCode,
				startYear: HelperService.getFullYear(startDate),
				startSemester: HelperService.getSemester(startDate),
				endYear: HelperService.getFullYear(endDate),
				endSemester: HelperService.getSemester(endDate)
			}
			return filterParameter;
		}

		init();
	}
})();
