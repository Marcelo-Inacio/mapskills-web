(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ScenesController', ScenesController);

	/** @ngInject */
	function ScenesController($log, $stateParams, toastrService, modalService, adminService, HelperService) {
		var vm = this;
		var themeId = $stateParams.themeId;;
		vm.allScenes = [];
		vm.allSkills = null;

		init();
		/** faz requisição ao backend de todas as cenas de um tema */
		function init() {
			adminService.validateProfile();
			loadScenesByThemeId(themeId, false);
			vm.scene = adminService.getObjectCurrent();
			adminService.setObjectCurrent(null);
		}

		vm.openSceneModal = function(scene) {
			adminService.setObjectCurrent(scene);
			var modalInstance = modalService.openModal('app/components/admin/scenes/modal/scene.modal.html', 'AdminSceneModalController');
			modalResult(modalInstance);
		}

		vm.openQuestionModal = function(scene) {
			adminService.setObjectCurrent(scene);
			var modalInstance = modalService.openModal('app/components/admin/scenes/modal/question.modal.html', 'AdminSceneModalController');
			modalResult(modalInstance);
		}

		function modalResult(modalInstance) {
			modalInstance.result.then(function () {
				loadScenesByThemeId(themeId, true);
			}, function () {
				 $log.info('modal-component dismissed at: ' + new Date());
			});
		}

		/** carrega todas cenas de um tema */
		function loadScenesByThemeId(themeId, fromServer) {
			adminService.loadScenesByThemeId(themeId, fromServer).then(function(data) {
				vm.allScenes = data;
			});
		}

		vm.updateIndexScenes = function(allScenes) {
			angular.forEach(allScenes, function(value, key) {
				value.index = key;
				$log.log(key + " : " + value.index);
			});
			adminService.updateIndexScenes(themeId, allScenes).then(function(status) {
				toastrService.showToastr(status);
			});
		}

		vm.deleteQuestion = function(sceneId) {
			adminService.deleteQuestion(themeId, sceneId).then(function(status) {
				loadScenesByThemeId(themeId, true);
				toastrService.showToastr(status);
			});
		}

		vm.deleteScene = function(sceneId) {
			adminService.deleteScene(themeId, sceneId).then(function(status) {
				loadScenesByThemeId(themeId, true);
				toastrService.showToastr(status);
			});
		}
	}
})();
