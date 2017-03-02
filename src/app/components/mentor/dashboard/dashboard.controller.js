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
		vm.array = [{"curso":"Tecnologia em Banco de Dados","values":[5, 35]},
								{"curso":"Tecnologia em Logistica","values":[39, 1]},
								{"curso":"Tecnologia em Manutenção de Aeronaves","values":[5, 35]},
								{"curso":"Tecnologia em Analise e Desenvolvimente de Sistemas","values":[39, 1]}]

	}

})();
