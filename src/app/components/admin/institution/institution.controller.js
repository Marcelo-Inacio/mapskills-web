(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('InstitutionController', InstitutionController);

	/** @ngInject */
	function InstitutionController($log, adminService, modalService) {
		var vm = this;

    vm.table_class = "success";

    init();

    function init() {
			adminService.loadAllInstitutions().then(function(response) {
				vm.allInstitutions = response.data;
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

    vm.saveInstitution = function(institution) {
      adminService.saveInstitution(institution);
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
