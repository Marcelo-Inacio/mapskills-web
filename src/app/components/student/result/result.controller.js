(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StudentResultsController', StudentResultsController);

	/** @ngInject */
	function StudentResultsController($log, studentService, loginService) {
		var vm = this;
		vm.data = [[], []];
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
				vm.skills = response.skills;
				angular.forEach(response.datasets, function() {
					vm.data[0].push(0);
					vm.data[1].push(20);
				});
				vm.data.push(response.datasets);
			});
		}

		vm.options = {
			legend: {	display: true }
		};
	}
})();
