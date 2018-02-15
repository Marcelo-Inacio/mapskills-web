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
			loadAllSkills();
    }

		function loadAllSkills() {
			adminService.loadAllSkills().then(function(response) {
				vm.allSkills = response;
			});
		}

		vm.openModal = function(skill) {
      modalService.setResult(skill);
      var modalInstance = modalService.openModal('app/components/admin/skill/modal/skill.modal.html', 'AdminSkillModalController');
			modalInstance.result.then(function () {
				loadAllSkills();
			});
		}
	}

})();
