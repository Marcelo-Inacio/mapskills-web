(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminSceneModalController', AdminSceneModalController);

	/** @ngInject */
	function AdminSceneModalController($log, $stateParams, toastrService, modalService, adminService, HelperService) {
		var vm = this;
		vm.scene = adminService.getObjectCurrent();
		vm.question = {alternatives: new Array(4)};
		vm.allSkills = [];
		vm.skillSelected = null;
		var themeId = $stateParams.themeId;

		init();

		function init() {
			loadSkills(true);
		}

		vm.saveScene = function(scene) {
			if (sceneIsInvalid(scene)) {
				return toastrService.showToastr(400);
			}
			scene.gameThemeId = themeId;
			adminService.saveScene(scene).then(function(status) {
				toastrService.showToastr(status);
				modalService.okModal();
			});
		}

		vm.saveSceneWithQuestion = function(scene, question) {
			if (!questionIsValid(question)) {
				toastrService.showToastr(400);
				return;
			}
			question.skillId = vm.skillSelected.id;
			scene.question = question;
			vm.saveScene(scene);
		}

		/** carrega todas competencias cadastadas */
		function loadSkills(loadFromServer) {
			adminService.loadAllSkills(loadFromServer).then(function(data) {
				vm.allSkills = data;
				loadSkillSelected();
			});
		}

		/** carrega a selecao da competencia no select */
		function loadSkillSelected() {
			if(HelperService.isUndefinedOrNull(vm.scene) || HelperService.isUndefinedOrNull(vm.scene.question)) {
				return;
			}
			var skillId = vm.scene.question.skillId;
			vm.skillSelected = adminService.getSkillById(skillId);
		}

		function questionIsValid(question) {
			if (HelperService.isUndefinedOrNull(vm.skillSelected)) {
				return false;
			}
			for (var index = 0; index < 4; index++) {
				var alternative = question.alternatives[index];
				if (HelperService.isUndefinedOrNull(alternative)
						|| HelperService.isUndefinedOrNull(alternative.description)
						|| HelperService.isUndefinedOrNull(alternative.skillValue)) {
					return false;
				}
			}
			return true;
		}

		function sceneIsInvalid(scene) {
			return HelperService.isUndefinedOrNull(scene)
				|| HelperService.isUndefinedOrNull(scene.text)
				|| scene.text == false
				|| HelperService.isUndefinedOrNull(scene.background)
		}

		vm.closeModal = function() {
			modalService.closeModal();
		}
	}
})();
