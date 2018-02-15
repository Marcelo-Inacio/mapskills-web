(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ScenesController', ScenesController);

	/** @ngInject */
	function ScenesController($log, $stateParams, toastrService, modalService, adminService) {
		var vm = this;
		var themeId = $stateParams.themeId;
		vm.allScenes = [];

		init();

		/**
		* Requisição ao backend de todas as cenas de um tema
		*/
		function init() {
			adminService.validateProfile();
			loadScenesByThemeId(themeId);
		}

		vm.openSceneModal = function(scene) {
			modalService.setResult(scene);
			var modalInstance = modalService.openModal('app/components/admin/scenes/modal/scene.modal.html', 'SceneModalController');
			modalResult(modalInstance);
		}

		vm.openQuestionModal = function(scene) {
			modalService.setResult(scene);
			var modalInstance = modalService.openModal('app/components/admin/scenes/modal/question.modal.html', 'SceneModalController');
			modalResult(modalInstance);
		}

		function modalResult(modalInstance) {
			modalInstance.result.then(function () {
				loadScenesByThemeId(themeId);
			});
		}

		/**
		* Carrega todas cenas do tema
		*/
		function loadScenesByThemeId(themeId) {
			adminService.loadScenesByThemeId(themeId).then(function(data) {
				vm.allScenes = data;
			});
		}

		vm.updateIndexScenes = function(allScenes) {
			angular.forEach(allScenes, function(scene, position) {
				scene.index = position;
				$log.log("scene.id : " + scene.id + " position : " + position);
			});
			adminService.updateIndexScenes(themeId, allScenes).then(function(status) {
				toastrService.showToastr(status);
			});
		}

		vm.deleteQuestion = function(sceneId) {
			adminService.deleteQuestion(themeId, sceneId).then(function(status) {
				loadScenesByThemeId(themeId);
				toastrService.showToastr(status);
			});
		}

		vm.deleteScene = function(sceneId) {
			adminService.deleteScene(themeId, sceneId).then(function(status) {
				loadScenesByThemeId(themeId);
				toastrService.showToastr(status);
			});
		}
	}
})();
