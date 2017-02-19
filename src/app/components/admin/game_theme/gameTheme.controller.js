(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('GameThemeController', GameThemeController);

	/** @ngInject */
	function GameThemeController($log, toastrService, adminService, modalService) {
		var vm = this;

		var init = function() {
			adminService.validateProfile();
			loadAllThemes();
		}

		init();

		function loadAllThemes() {
			adminService.loadAllThemes().then(function(response) {
				vm.allThemes = response;
			});
		}

		vm.saveTheme = function(theme) {
			adminService.saveTheme(theme).then(function(status) {
				loadAllThemes();
				toastrService.showToastr(status);
				vm.closeModal();
			})
		}

		vm.openModal = function() {
      modalService.openModal('/app/components/admin/game_theme/gameTheme.modal.html', 'GameThemeController');
		}

		vm.updateThemes = function(themes) {
			adminService.updateThemes(themes).then(function(status) {
				toastrService.showToastr(status);
			})
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
