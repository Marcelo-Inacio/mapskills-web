(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('GameThemeController', GameThemeController);

	/** @ngInject */
	function GameThemeController($log, toastr, adminService, modalService) {
		var vm = this;

		var init = function() {
			loadAllThemes();
		}

		init();

		function loadAllThemes() {
			adminService.loadAllThemes().then(function(response) {
				vm.allThemes = response;
			});
		}

		vm.openModal = function() {
      modalService.openModal('/app/components/admin/game_theme/gameTheme.modal.html', 'GameThemeController');
		}

		vm.updateThemes = function(themes) {
			adminService.updateThemes(themes).then(function(status) {
				if(status == 200) {
					toastr.success('Atualização feita com sucesso', 'Feito!');
				} else {
					toastr.error('Erro ao tentar atualizar.', 'Falha!');
				}
			})
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
