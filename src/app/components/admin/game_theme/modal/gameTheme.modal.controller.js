(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('GameThemeModalController', GameThemeModalController);

	/** @ngInject */
	function GameThemeModalController(modalService) {
		var vm = this;

		vm.saveTheme = function(theme) {
			modalService.okModal(theme);
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}
	}
})();
