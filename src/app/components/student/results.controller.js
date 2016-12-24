(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StudentResultsController', StudentResultsController);

	/** @ngInject */
	function StudentResultsController($log, studentService, storageService) {

		/** função principal que recupera os resultados do aluno */
		(function() {
      var user = storageService.getItem('user');
			studentService.getRadarResults(1).then(function(response) {
				$log.log(response.data);
        radarChartfactory(response.data);
			});
		})();

    function radarChartfactory(chartData) {
      var radarData = chartData;

      var options = {
        segmentShowStroke: false,
        showScale: true,
        scaleShowLabels: true,
        scaleBeginAtZero: false,
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        tooltipFontSize: 20,
        scaleFontSize: 20,
				pointLabelFontSize: 20,
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: true,
					position: "bottom"
				}
      }

      var ctx = document.getElementById("radarChart").getContext("2d");

      var myRadarChart = new Chart(ctx, {
          type: 'radar',
          data: radarData,
          options: options
      });
    }

	}

})();
