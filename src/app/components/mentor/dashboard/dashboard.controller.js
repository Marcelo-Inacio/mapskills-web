(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorDashboardController', MentorDashboardController);

	/** @ngInject */
	function MentorDashboardController($log, mentorService) {
		var vm = this;
    vm.courseSelected = null;
    vm.allStudentsByCourses;

		init();

    function init() {
			mentorService.validateProfile();
    }

		vm.labels = ["Finalizados", "Não Finalizados"];
		vm.array = [{"curso":"028","values":[5, 35]},
								{"curso":"077","values":[39, 1]},
								{"curso":"138","values":[5, 35]},
								{"curso":"175","values":[39, 1]}]

	}

})();
