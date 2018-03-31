(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('InstitutionController', InstitutionController);

	/** @ngInject */
	function InstitutionController($log, toastrService, adminService, modalService, downloadService) {
		var vm = this;
		vm.tableHead = ["Código", "CNPJ", "Razão", "Cidade", "Ação"];

    init();

    function init() {
			adminService.validateProfile();
			loadAllInstitutions();
    }

		function loadAllInstitutions() {
			adminService.loadAllInstitutions().then(function(response) {
				vm.allInstitutions = response;
			});
		}

		vm.openDetailsModal = function(institution) {
			adminService.getInstitutionDetails(institution.id).then(function(data) {
				modalService.setResult(data);
				modalService.openModal('app/components/admin/institution/modal/details.modal.html', 'InstitutionModalController');
			});
		}

		vm.openFileModal = function() {
			modalService.setResult(downloadTemplate);
      var modalInstance = modalService.openModal('app/shared/modal/file.modal.html', 'FileController');
			modalInstance.result.then(function (file) {
				sendFile(file);
			});
		}

		vm.newInstitution = function () {
			var institution = {"mentors": [{"id": null, "name": null, "username": null}]};
			modalService.setResult(institution);
			var modalInstance = modalService.openModal('app/components/admin/institution/modal/edit.modal.html', 'InstitutionModalController');
			modalInstanceResult(modalInstance);
		}

		vm.updateInstitution = function(institution) {
			adminService.getInstitutionDetails(institution.id).then(function(data) {
				modalService.setResult(data);
				var modalInstance = modalService.openModal('app/components/admin/institution/modal/edit.modal.html', 'InstitutionModalController');
				modalInstanceResult(modalInstance);
			});
		}

		function modalInstanceResult(modalInstance) {
			modalInstance.result.then(function (institution) {
				adminService.saveInstitution(institution).then(function(response) {
					loadAllInstitutions();
					toastrService.showToastr(response.status);
				});
			});
		}

		function sendFile(file) {
      adminService.sendFile(file).then(function(status) {
				loadAllInstitutions();
				toastrService.showToastr(status);
			});
    }

		function downloadTemplate() {
			downloadService.template("institution.xlsx");
		}
	}
})();
