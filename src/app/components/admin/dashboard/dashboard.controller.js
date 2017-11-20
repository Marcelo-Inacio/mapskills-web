(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminDashboardController', AdminDashboardController);

	/** @ngInject */
	function AdminDashboardController(toastr, adminService) {
		var vm = this;
		vm.labels = ["Finalizados", "Não Finalizados"];
		vm.indicator = {
			fatecs : {values: null},
			etecs: {values: null}
		};
		vm.hasResult = {etecs: false, fatecs: false};
		init();

		function init() {
			adminService.validateProfile();
			adminService.dashboard.global().then(function(response) {
				loadResults(response);
			});
		}

		function loadResults(response) {
			angular.forEach(response, function(value, key) {
				var institution = value.level.toLowerCase();
				vm.indicator[institution].values = value.values;
				vm.hasResult[institution] = true;
			});
		}
	}

})();
