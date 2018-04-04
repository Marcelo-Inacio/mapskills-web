(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('GameThemeController', GameThemeController);

	/** @ngInject */
	function GameThemeController(toastrService, adminService, modalService) {
		var vm = this;
		vm.defaultImage = "assets/images/image_unavailable.png";

		init();

		function init() {
			adminService.validateProfile();
			loadAllThemes();
		}

		function loadAllThemes() {
			adminService.loadAllThemes().then(function(response) {
				vm.allThemes = response;
			});
		}

		vm.openModal = function() {
      var modalInstance = modalService.openModal('app/components/admin/gameTheme/modal/gameTheme.modal.html', 'GameThemeModalController');
			modalInstance.result.then(function (theme) {
				adminService.saveTheme(theme).then(function(status) {
					loadAllThemes();
					toastrService.showToastr(status);
				})
			});
		}

		vm.updateStatus = function(id, status) {
			adminService.updateThemeStatus(id, status).then(function(status) {
				toastrService.showToastr(status);
			})
		}
	}
})();
