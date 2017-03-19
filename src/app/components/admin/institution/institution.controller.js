(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('InstitutionController', InstitutionController);

	/** @ngInject */
	function InstitutionController($log, toastrService, adminService, modalService, downloadService) {
		var vm = this;
		vm.institutionDetails = null;
		vm.checkboxPassword = false;
    vm.showPassword = {"true" : "text", "false" : "password"};
		vm.allLevels = ["TÉCNICO", "SUPERIOR"];

    init();

    function init() {
			adminService.validateProfile();
			loadAllInstitutions(false);
      vm.institutionDetails = adminService.getObjectCurrent();
			$log.log(vm.institutionDetails);
			adminService.setObjectCurrent(null);
    }

		function loadAllInstitutions(loadFromServer) {
			adminService.loadAllInstitutions(loadFromServer).then(function(response) {
				vm.allInstitutions = response;
			});
		}

		vm.openDetailsModal = function(institution) {
			adminService.getInstitutionDetails(institution.id).then(function() {
				modalService.openModal('app/components/admin/institution/details.modal.html', 'InstitutionController');
			});
		}

    vm.openEditModal = function(institution) {
			if(institution != null) {
				adminService.getInstitutionDetails(institution.id).then(function() {
					modalService.openModal('app/components/admin/institution/edit.modal.html', 'InstitutionController');
				});
			} else {
				modalService.openModal('app/components/admin/institution/edit.modal.html', 'InstitutionController');
			}
		}

		vm.openFileModal = function() {
      modalService.openModal('app/shared/modal/file.modal.html', 'InstitutionController');
		}

    vm.saveInstitution = function(institution) {
      adminService.saveInstitution(institution).then(function(status) {
				if(status == 200) {
					loadAllInstitutions(true);
				}
				toastrService.showToastr(status);
				vm.closeModal();
			});
    }

		vm.sendFile = function(file) {
      adminService.sendFile(file).then(function() {
				vm.closeModal();
			});
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

		vm.downloadTemplate = function() {
			downloadService.template("institution.xlsx");
		}

	}

})();
