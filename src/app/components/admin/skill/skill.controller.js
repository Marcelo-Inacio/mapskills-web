(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('SkillController', SkillController);

	/** @ngInject */
	function SkillController($log, toastrService, adminService, modalService) {
		var vm = this;

    init();

    function init() {
			adminService.validateProfile();
			loadAllSkills(false);
      vm.skill = adminService.getObjectCurrent();
			adminService.setObjectCurrent(null);
    }

		function loadAllSkills(loadFromServer) {
			adminService.loadAllSkills(loadFromServer).then(function(response) {
				vm.allSkills = response;
			});
		}

		vm.openModal = function(skill) {
      adminService.setObjectCurrent(skill);
      modalService.openModal('app/components/admin/skill/skill.modal.html', 'SkillController');
		}

    vm.saveSkill = function(skill) {
      adminService.saveSkill(skill).then(function(status) {
				if(status === 200) {
					loadAllSkills(true);
				}
				toastrService.showToastr(status);
				vm.closeModal();
			});
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
