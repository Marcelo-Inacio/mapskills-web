(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('InstitutionController', InstitutionController);

	/** @ngInject */
	function InstitutionController($log, adminService, modalService) {
		var vm = this;

		vm.checkboxPassword = false;
    vm.showPassword = {"true" : "text", "false" : "password"};

    init();

    function init() {
			adminService.loadAllInstitutions().then(function(response) {
				vm.allInstitutions = response;
			});
      vm.institution = adminService.getObjectCurrent();
			adminService.setObjectCurrent(null);
    }

		vm.openDetailsModal = function(institution) {
      adminService.setObjectCurrent(institution);
      modalService.openModal('/app/components/admin/institution/details.modal.html', 'InstitutionController');
		}

    vm.openEditModal = function(institution) {
      adminService.setObjectCurrent(institution);
      modalService.openModal('/app/components/admin/institution/edit.modal.html', 'InstitutionController');
		}

		vm.openFileModal = function() {
      modalService.openModal('/app/shared/modal/file.modal.html', 'InstitutionController');
		}

    vm.saveInstitution = function(institution) {
      adminService.saveInstitution(institution);
    }

		vm.sendFile = function(file) {
      adminService.sendFile(file);
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
