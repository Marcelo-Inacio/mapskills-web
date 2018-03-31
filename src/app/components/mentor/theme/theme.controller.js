(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorThemeController', MentorThemeController);

	/** @ngInject */
	function MentorThemeController($log, toastrService, mentorService, loginService) {
		var vm = this;
		var themeIdCurrent;
		vm.themeCurrent;
		vm.defaultImage = "assets/images/image_unavailable.png";

		var init = function() {
			mentorService.validateProfile();
			themeIdCurrent = loginService.getUserLogged().institution.gameThemeId;
			loadAllThemes();
		}

/** carrega todos temas disponiveis que estão habilitados pelo administrador 	*/
		function loadAllThemes() {
			mentorService.loadAllThemesActivated().then(function(response) {
				vm.allThemes = response;
				disableOthersThemes();
			});
		}

/** coloca todos temas vindo do server como false, somente colocando como true
o que está habilitado para o instituição */
		function disableOthersThemes() {
			$log.log("função: disableOthersThemes, ID TEMA ATUAL => "+themeIdCurrent);
			var sizeArray = vm.allThemes.length;
			for (var i = 0; i < sizeArray; i++) {
				if (vm.allThemes[i].id == themeIdCurrent) vm.allThemes[i].active = true;
				else vm.allThemes[i].active = false;
			}
		}

		vm.updateThemeIdCurrent = function() {
			var institutionCode = loginService.getUserLogged().institution.code;
			if (themeIdCurrent == null) {
				return;
			}
			mentorService.updateThemeIdCurrent(institutionCode, themeIdCurrent).then(function(status) {
				toastrService.showToastr(status);
			});
		}

/** manipula os switchs para que fique somente um ATIVO
ou todos DESATIVADOS  */
		vm.setThemeCurrent = function(theme) {
			if (themeIdCurrent == theme.id) {
				themeIdCurrent = 0;
			}	else if(themeIdCurrent) {
				vm.allThemes[themeIdCurrent - 1].active = false;
				themeIdCurrent = theme.id;
			}	else {
				themeIdCurrent = theme.id;
			}
		}

		init();

	}
})();
