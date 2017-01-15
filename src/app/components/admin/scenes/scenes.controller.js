(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ScenesController', ScenesController);

	/** @ngInject */
	function ScenesController($log, $stateParams, modalService, adminService) {
		var vm = this;
		var themeId;
		vm.allScenes = null;
		vm.allSkills = null;
		vm.skillSelected = null;

		vm.info_tooltip = "Arraste as linhas da tabela para reordenar a exibição das cenas do jogo";

		init();
		/** faz requisição ao backend de todas as cenas de um tema */
		function init() {
			themeId = $stateParams.themeId;
			loadScenesByThemeId(themeId);
			loadAllSkills();
			vm.scene = adminService.getObjectCurrent();
			if(vm.scene != null) {
				if(vm.scene.question === null) return;
				$log.log("CENA É DIFERENTE DE NULO");
				var id = vm.scene.question.skillId;
				vm.skillSelected = adminService.getSkillById(id);
			}
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
		/** carrega todas cenas de um tema */
		function loadScenesByThemeId(themeId) {
			adminService.loadScenesByThemeId(themeId).then(function(data) {
				vm.allScenes = data;
			});
		}

		/** carrega todas competencias cadastadas */
		function loadAllSkills() {
			adminService.loadAllSkills().then(function(data) {
				vm.allSkills =  data;
			});
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}
/** NOVA CENA -> SALVAR (POST), ADD QUESTAO OU EDITAR -> UPDATE (PUT)*/
		vm.saveScene = function(scene, skillId) {
			if(scene.question == null) {
				scene.question = null;
			}	else if(skillId !== null) {
				scene.question.skillId = skillId;
			}
			scene.gameThemeId = themeId;
			adminService.saveScene(scene, "POST").then(function(status) {
				loadScenesByThemeId(themeId);
				vm.closeModal();
			});
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
