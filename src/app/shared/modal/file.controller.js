(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('FileController', FileController);

	/** @ngInject */
	function FileController(modalService) {
		var vm = this;

		vm.closeModal = function() {
			modalService.closeModal();
		}

    vm.downloadTemplate = function() {
      var template = modalService.getResult();
      template();
		}

    vm.sendFile = function(file) {
      modalService.okModal(file);
    }

	}
})();
