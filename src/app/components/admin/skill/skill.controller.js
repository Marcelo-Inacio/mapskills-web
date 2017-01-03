(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('SkillController', SkillController);

	/** @ngInject */
	function SkillController($log, adminService, modalService) {
		var vm = this;

    init();

    function init() {
			adminService.loadAllSkills().then(function(response) {
				vm.allSkills = response;
			});
      vm.skill = adminService.getObjectCurrent();
			adminService.setObjectCurrent(null);
    }

		vm.openModal = function(skill) {
      adminService.setObjectCurrent(skill);
      modalService.openModal('/app/components/admin/skill/skill.modal.html', 'SkillController');
		}

    vm.saveSkill = function(skill) {
      adminService.saveSkill(skill);
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
