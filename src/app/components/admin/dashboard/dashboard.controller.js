(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminDashboardController', AdminDashboardController);

	/** @ngInject */
	function AdminDashboardController(toastr, loginService) {
		var vm = this;
		vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  	vm.data = [300, 500, 100];
	}

})();
