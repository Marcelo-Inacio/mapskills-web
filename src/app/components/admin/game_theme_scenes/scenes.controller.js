(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ScenesController', ScenesController);

	/** @ngInject */
	function ScenesController($log, $stateParams, modalService, adminService) {
		var vm = this;
		vm.skillsOptions;
		vm.questionCurrent;

		init();
		/** faz requisição ao backend de todas as cenas de um tema */
		function init() {
			adminService.loadScenesByThemeId($stateParams.themeId).then(function(response) {
				vm.allScenes = response.data;
			});
			loadAllSkills();
		}

		vm.openSceneModal = function() {
			modalService.openModal('/app/components/admin/game_theme_scenes/newSceneModal.html', 'ScenesController');
		}

		vm.openQuestionModal = function(questionSelected) {
			vm.questionCurrent = questionSelected;
			modalService.openModal('/app/components/admin/game_theme_scenes/questionModal.html', 'ScenesController');
		}

		/** carrega todas competencias cadastadas */
		function loadAllSkills() {
			adminService.loadAllSkills().then(function(response) {
				vm.skillsOptions = response.data;
			});
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}

		vm.saveQuestion = function(params) {
			$log.log(params);
		}
		vm.deleteQuestion = function(questionId) {
			adminService.deleteQuestion(questionId);
		}

	}

})();
