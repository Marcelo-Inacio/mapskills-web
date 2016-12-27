(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ModalController', ModalController);

	/** @ngInject */
	function ModalController($uibModalInstance, params, modalService) {
		var vm = this;

		vm.skillSelected;
		vm.skillsOptions = params;

		vm.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		}

		vm.save = function() {
			vm.cancel();
			modalService.setResult(vm.skillSelected);
		}
	}

})();
