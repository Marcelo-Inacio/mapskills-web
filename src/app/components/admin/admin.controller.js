(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminController', AdminController);

	/** @ngInject */
	function AdminController($log, adminService, modalService) {
		var vm = this;

		(function() {
			adminService.loadAllSkills().then(function(response) {
				vm.skillsOptions = response.data;
			});
		})();

		vm.openModal = function() {
			modalService.openModal('/app/components/admin/modal.html', vm.skillsOptions);
		}

		vm.result = function() {
			$log.log(modalService.getResult());
		}
		vm.show = function(skillName) {
			$log.log(skillName.code);
		}
	}

})();
