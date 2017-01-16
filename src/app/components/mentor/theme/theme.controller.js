(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorThemeController', MentorThemeController);

	/** @ngInject */
	function MentorThemeController($log, toastrService, mentorService, storageService) {
		var vm = this;
		var themeIdCurrent;
		vm.themeCurrent;

		var init = function() {
			loadThemeCurrent();
		}

		init();
/** coloca todos temas vindo do server como false, somente colocando como true
o que está habilitado para o instituição */
		function disableOthersThemes() {
			$log.log("função: disableOthersThemes, ID TEMA ATUAL => "+themeIdCurrent);
			var sizeArray = vm.allThemes.length;
			for(var i = 0; i < sizeArray; i++) {
				if(vm.allThemes[i].id == themeIdCurrent) vm.allThemes[i].active = true;
				else vm.allThemes[i].active = false;
			}
		}
/** carrega todos temas disponiveis que estão habilitados pelo administrador 	*/
		function loadAllThemes() {
			mentorService.loadAllThemesActivated().then(function(response) {
				vm.allThemes = response;
				disableOthersThemes();
			});
		}

		function loadThemeCurrent() {
			var institutionCode = 146;//storageService.getItem('user').institutionCode;
			mentorService.loadThemeCurrent(institutionCode).then(function(response) {
				themeIdCurrent = response;
				loadAllThemes();
			});
		}

		vm.updateThemeIdCurrent = function() {
			var institutionCode = 146;//storageService.getItem('user').institutionCode;
			mentorService.updateThemeIdCurrent(institutionCode, themeIdCurrent).then(function(status) {
				toastrService.showToastr(status);
			});
		}

/** manipula os switchs para que fique somente um ATIVO
ou todos DESATIVADOS  */
		vm.setThemeCurrent = function(theme, index) {
			if(themeIdCurrent == theme.id) {
				themeIdCurrent = 0;
			}
			else if(themeIdCurrent != 0) {
				vm.allThemes[themeIdCurrent - 1].active = false;
				themeIdCurrent = theme.id;
			}	else {
				themeIdCurrent = theme.id;
			}
		}

	}
})();
