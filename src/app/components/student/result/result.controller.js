(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StudentResultsController', StudentResultsController);

	/** @ngInject */
	function StudentResultsController($log, studentService/*, storageService*/) {

		init();
		/** função principal que recupera os resultados do aluno */
		function init() {
      //var user = storageService.getItem("user");
			studentService.getRadarResults(1).then(function(response) {
				$log.log(response);
        radarChartfactory(response);
			});
		}

    function radarChartfactory(chartData) {
      var radarData = {
				"labels": chartData.labels,
				"datasets": [{
					"label": "Pontos",
					"backgroundColor": "rgba(0,0,255,0.3)",
					"borderColor": "rgba(179,181,198,1)",
					"pointBackgroundColor": "rgba(0, 255, 0, 0.3)",
					"pointBorderColor": "#fff",
					"pointHoverBackgroundColor": "#fff",
					"pointHoverBorderColor": "rgba(179,181,198,1)",
					"data": chartData.datasets
				}]
			};

      var options = {
        segmentShowStroke: false,
        showScale: true,
        scaleShowLabels: true,
        scaleBeginAtZero: false,
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'",
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

      new Chart(ctx, {
				type: 'radar',
				data: radarData,
				options: options
      });
    }

	}

})();
