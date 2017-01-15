(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('InstitutionController', InstitutionController);

	/** @ngInject */
	function InstitutionController($log, toastr, adminService, modalService) {
		var vm = this;
		vm.institutionDetails = null;
		vm.checkboxPassword = false;
    vm.showPassword = {"true" : "text", "false" : "password"};

    init();

    function init() {
			loadAllInstitutions();
      vm.institutionDetails = adminService.getObjectCurrent();
			adminService.setObjectCurrent(null);
    }

		function loadAllInstitutions() {
			adminService.loadAllInstitutions().then(function(response) {
				vm.allInstitutions = response;
			});
		}

		vm.openDetailsModal = function(institution) {
			adminService.getInstitutionDetails(institution.id).then(function() {
				modalService.openModal('/app/components/admin/institution/details.modal.html', 'InstitutionController');
			});
		}

    vm.openEditModal = function(institution) {
			if(institution != null) {
	      adminService.getInstitutionDetails(institution.id).then(function() {
					modalService.openModal('/app/components/admin/institution/edit.modal.html', 'InstitutionController');
				});
			} else {
				modalService.openModal('/app/components/admin/institution/edit.modal.html', 'InstitutionController');
			}
		}

		vm.openFileModal = function() {
      modalService.openModal('/app/shared/modal/file.modal.html', 'InstitutionController');
		}

    vm.saveInstitution = function(institution) {
      adminService.saveInstitution(institution).then(function(status) {
				if(status == 200) {
					loadAllInstitutions();
					toastr.success('Salvo com sucesso', 'Feito!');
				} else {
					toastr.error('Erro ao tentar salvar.', 'Falha!');
				}
				vm.closeModal();
			});
    }

		vm.sendFile = function(file) {
      adminService.sendFile(file).then(function(status) {
				vm.closeModal();
			});
    }

		vm.closeModal = function() {
			modalService.closeModal();
		}

	}

})();
