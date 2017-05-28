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
		vm.courses = [{"code":"028", "name":"Info01"}, {"code":"077", "name":"Info02"},
									{"code":"138", "name":"Info03"}, {"code":"175", "name":"Info04"},
									{"code":"176", "name":"Info05"}, {"code":"177", "name":"Info06"}];

		vm.array = [{"curso":"028","values":[5, 35]},
								{"curso":"077","values":[39, 1]},
								{"curso":"138","values":[5, 35]},
								{"curso":"175","values":[39, 1]},
								{"curso":"176","values":[39, 1]},
								{"curso":"177","values":[39, 1]}]

	}

})();
