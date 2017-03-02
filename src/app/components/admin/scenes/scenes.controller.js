(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ScenesController', ScenesController);

	/** @ngInject */
	function ScenesController($log, $stateParams, toastrService, modalService, adminService) {
		var vm = this;
		var themeId;
		vm.allScenes = null;
		vm.allSkills = null;
		vm.skillSelected = null;
		vm.scene = {"question":null};

		vm.info_tooltip = "Arraste as linhas da tabela para reordenar a exibição das cenas do jogo";

		init();
		/** faz requisição ao backend de todas as cenas de um tema */
		function init() {
			adminService.validateProfile();
			themeId = $stateParams.themeId;
			loadScenesByThemeId(themeId, false);
			loadAllSkills(false);
			vm.scene = adminService.getObjectCurrent();
			sceneVerify();
			adminService.setObjectCurrent(null);
		}

		function sceneVerify() {
			if(vm.scene != null) {
				if(vm.scene.question === null) return;
				var id = vm.scene.question.skillId;
				vm.skillSelected = adminService.getSkillById(id);
			}
		}

		vm.openSceneModal = function(scene) {
			adminService.setObjectCurrent(scene);
			modalService.openModal('app/components/admin/scenes/scene.modal.html', 'ScenesController');
		}

		vm.openQuestionModal = function(scene) {
			adminService.setObjectCurrent(scene);
			modalService.openModal('app/components/admin/scenes/question.modal.html', 'ScenesController');
		}
		/** carrega todas cenas de um tema */
		function loadScenesByThemeId(themeId, fromServer) {
			adminService.loadScenesByThemeId(themeId, fromServer).then(function(data) {
				vm.allScenes = data;
			});
		}

		/** carrega todas competencias cadastadas */
		function loadAllSkills(loadFromServer) {
			adminService.loadAllSkills(loadFromServer).then(function(data) {
				vm.allSkills =  data;
			});
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}
/** NOVA CENA -> SALVAR (POST), ADD QUESTAO OU EDITAR -> UPDATE (PUT)*/
		vm.saveScene = function(scene, skillId) {
			if(scene.question) {
				$log.log(scene.question);
				if(skillId === null) {
					toastrService.showToastr(400);
					return;
				}
				scene.question.skillId = skillId;
			}
			scene.gameThemeId = themeId;
			adminService.saveScene(scene, "POST").then(function(status) {
				$log.log(status);
				toastrService.showToastr(status);
				loadScenesByThemeId(themeId, true);
				vm.closeModal();
			});
		}

		vm.updateIndexScenes = function(allScenes) {
			adminService.updateIndexScenes(allScenes).then(function(status) {
				toastrService.showToastr(status);
			});
		}

		vm.deleteQuestion = function(sceneId) {
			adminService.deleteQuestion(sceneId).then(function(status) {
				loadScenesByThemeId(themeId, true);
				toastrService.showToastr(status);
			});
		}

		vm.deleteScene = function(sceneId) {
			adminService.deleteScene(sceneId).then(function(status) {
				loadScenesByThemeId(themeId, true);
				toastrService.showToastr(status);
			});
		}

		function verifyQuestion() {

		}

	}

})();
