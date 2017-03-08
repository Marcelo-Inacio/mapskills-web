(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StudentResultsController', StudentResultsController);

	/** @ngInject */
	function StudentResultsController($log, studentService, loginService) {
		var vm = this;
		init();
		/** função principal que recupera os resultados do aluno */
		function init() {
			studentService.validateProfile();
      var user = loginService.getUserLogged();
			studentService.getRadarResults(user.id).then(function(response) {
        //radarChartfactory(response);
				vm.labels = response.labels;
			  vm.data = response.datasets;
				vm.skills = response.skills;
			});
		}
		/*vm.data = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  data: [65, 59, 90, 81, 56, 55, 40]
                }
            ]
        };*/

		vm.options = {
			legend: {	display: true }
		};
		vm.colors = [{pointBackgroundColor: "rgba(151, 187, 205, 0.5)"}];
		vm.datasetOverride = [
      {
				borderColor: 'rgba(220, 19, 19, 1)',
				hoverBorderColor: 'rgba(0, 255, 0, 1)',
				borderWidth: 3,
				hoverBorderWidth: 3,
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)"
			}
    ];
	}
})();
