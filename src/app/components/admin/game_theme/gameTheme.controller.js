(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('GameThemeController', GameThemeController);

	/** @ngInject */
	function GameThemeController($log, adminService, modalService) {
		var vm = this;
		vm.newTheme = {"description" : "aqui eh umm novo tema"};

		(function() {
			adminService.loadAllThemes().then(function(response) {
				vm.allThemes = response.data;
			});
		})();

		vm.openModal = function() {
      modalService.openModal('/app/components/admin/game_theme/newGameThemeModal.html', 'GameThemeController', null);
		}

    vm.updateThemes = function(allThemes) {
      adminService.updateThemes(allThemes);
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
