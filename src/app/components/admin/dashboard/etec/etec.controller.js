(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminEtecController', AdminEtecController);

	/** @ngInject */
	function AdminEtecController(toastr, loginService) {
		var vm = this;

		vm.labels = ['146', '147', '148', '149', '150', '151', '152'];
    vm.series = ['Finalizados', 'Não Finalizados'];

    vm.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

	}

})();
