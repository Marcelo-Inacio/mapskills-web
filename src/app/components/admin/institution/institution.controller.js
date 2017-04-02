(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('InstitutionController', InstitutionController);

	/** @ngInject */
	function InstitutionController($log, toastrService, adminService, modalService, downloadService, HelperService) {
		var vm = this;
		vm.institutionDetails = null;
		vm.checkboxPassword = false;
    vm.showPassword = {"true" : "text", "false" : "password"};
		vm.allLevels = ["TECHNICAL", "SUPERIOR"];
		vm.tableHead = ["Código", "CNPJ", "Razão", "Cidade", "Ação"];

    init();

    function init() {
			adminService.validateProfile();
			loadAllInstitutions(false);
      vm.institutionDetails = adminService.getObjectCurrent();
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
			if(institution !== null) {
				adminService.getInstitutionDetails(institution.id).then(function() {
					modalService.openModal('app/components/admin/institution/edit.modal.html', 'InstitutionController');
				});
			} else {
				institution = {"mentors": [{"id": null, "name": null, "username": null}]};
				adminService.setObjectCurrent(institution);
				modalService.openModal('app/components/admin/institution/edit.modal.html', 'InstitutionController');
			}
		}

		vm.openFileModal = function() {
      modalService.openModal('app/shared/modal/file.modal.html', 'InstitutionController');
		}

    vm.saveInstitution = function(institution) {
			if(validateInstitution(institution)) {
				toastrService.showToastr(400);
				return;
			}
      adminService.saveInstitution(institution).then(function(response) {
				if(response.status == 200) {
					vm.allInstitutions.push(response.data);
					loadAllInstitutions(true);
				}
				toastrService.showToastr(response.status);
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

		function validateInstitution(institution) {
			return (HelperService.isUndefinedOrNull(institution) || HelperService.isUndefinedOrNull(institution.code) ||
							HelperService.isUndefinedOrNull(institution.cnpj) || HelperService.isUndefinedOrNull(institution.company) ||
							HelperService.isUndefinedOrNull(institution.level) || HelperService.isUndefinedOrNull(institution.city) ||
							HelperService.isUndefinedOrNull(institution.mentors) || HelperService.isUndefinedOrNull(institution.mentors[0].name) ||
							HelperService.isUndefinedOrNull(institution.mentors[0].username));
		}

	}

})();
