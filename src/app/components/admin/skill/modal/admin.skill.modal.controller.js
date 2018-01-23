(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminSkillModalController', AdminSkillModalController);

	/** @ngInject */
	function AdminSkillModalController(toastrService, modalService, adminService, HelperService) {
		var vm = this;
		vm.skill = adminService.getObjectCurrent();

		vm.saveSkill = function(skill) {
			if (skillIsInvalid(skill)) {
				return toastrService.showToastr(400);
			}
      adminService.saveSkill(skill).then(function(status) {
				toastrService.showToastr(status);
				modalService.okModal();
			});
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

		function skillIsInvalid(skill) {
			return HelperService.isUndefinedOrNull(skill)
				|| HelperService.isUndefinedOrNull(skill.name) || skill.name === ""
				|| HelperService.isUndefinedOrNull(skill.description) || skill.description === "";
		}
	}
})();
