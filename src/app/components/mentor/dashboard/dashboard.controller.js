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
		vm.array = [{"curso":"banco de dados","values":[5, 35]},
								{"curso":"logistica","values":[39, 1]}]

	}

})();
