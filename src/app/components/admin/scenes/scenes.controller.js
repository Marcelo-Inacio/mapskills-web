(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ScenesController', ScenesController);

	/** @ngInject */
	function ScenesController($log, $stateParams, modalService, adminService) {
		var vm = this;
		var themeId;

		vm.info_tooltip = "Arraste as linhas da tabela para reordenar a exibição das cenas do jogo";

		init();
		/** faz requisição ao backend de todas as cenas de um tema */
		function init() {
			themeId = $stateParams.themeId;
			adminService.loadScenesByThemeId(themeId).then(function(response) {
				vm.allScenes = response;
			});
			loadAllSkills();
			vm.scene = adminService.getObjectCurrent();
			adminService.setObjectCurrent(null);
		}

		vm.openSceneModal = function(scene) {
			adminService.setObjectCurrent(scene);
			modalService.openModal('/app/components/admin/scenes/scene.modal.html', 'ScenesController');
		}

		vm.openQuestionModal = function(scene) {
			adminService.setObjectCurrent(scene);
			modalService.openModal('/app/components/admin/scenes/question.modal.html', 'ScenesController');
		}

		/** carrega todas competencias cadastadas */
		function loadAllSkills() {
			adminService.loadAllSkills().then(function(response) {
				vm.allSkills = response;
			});
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}

		vm.saveScene = function(scene) {
			scene.gameThemeId = themeId;
			adminService.saveScene(scene).then(function(data) {
			});
			vm.closeModal();
		}

		vm.updateIndexScenes = function(allScenes) {
			adminService.updateIndexScenes(allScenes);
		}

		vm.deleteQuestion = function(questionId) {
			adminService.deleteQuestion(questionId);
		}

		vm.deleteScene = function(sceneId) {
			adminService.deleteScene(sceneId);
		}

	}

})();
