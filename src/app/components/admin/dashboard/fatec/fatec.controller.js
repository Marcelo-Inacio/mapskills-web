(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminFatecController', AdminFatecController);

	/** @ngInject */
	function AdminFatecController(toastr, adminService, loginService) {
		var vm = this;

		init();

		function init() {
			adminService.validateProfile();
			adminService.dashboard.level("SUPERIOR").then(function(response) {
				console.log(response);
			})
		};
    vm.series = ['Finalizados', 'Não Finalizados'];
		vm.codes = [];
    vm.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [35, 41, 20, 19, 44, 45, 60]
    ];
		vm.fatecs = [{code:'146', company:'Fatec São José dos Campos'},
								 {code:'147', company:'Fatec São José dos Campos'},
							 	 {code:'148', company:'Fatec São José dos Campos'},
						 	 	 {code:'149', company:'Fatec São José dos Campos'},
					 		 	 {code:'150', company:'Fatec São José dos Campos'},
							 	 {code:'151', company:'Fatec São José dos Campos'},
						 	 	 {code:'152', company:'Fatec São José dos Campos'}];

		vm.options = {
      scales: { xAxes: [{ stacked: true,}],
        				yAxes: [{ stacked: true }]
      }
    };

		angular.forEach(vm.fatecs, function(value, key) {
			vm.codes.push(value.code);
		});

	}

})();
