(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StudentResultsController', StudentResultsController);

	/** @ngInject */
	function StudentResultsController($log, studentService, loginService) {
		var vm = this;
		vm.data = [[0, 0, 0, 0, 0, 0], [16, 16, 16, 16, 16, 16]];
		vm.series = ['Valor minimo', 'Valor máximo', 'Seu valor'];

		init();

		/**
		 * Função principal que recupera os resultados do aluno
		 */
		function init() {
			studentService.validateProfile();
      var user = loginService.getUserLogged();
			studentService.getRadarResults(user.id).then(function(response) {
				vm.labels = response.labels;
				vm.data.push(response.datasets);
				vm.skills = response.skills;
			});
		}

		vm.options = {
			legend: {	display: true }
		};
	}
})();
