(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('InstitutionModalController', InstitutionModalController);

	/** @ngInject */
	function InstitutionModalController(modalService, HelperService, toastrService, loginService) {
		var vm = this;
		vm.institution = modalService.getResult();
		vm.allLevels = ["TECHNICAL", "SUPERIOR"];
		vm.checkboxPassword = false;
		vm.showPassword = {"true" : "text", "false" : "password"};

		vm.saveInstitution = function(institution) {
			if(validateInstitution(institution)) {
				toastrService.showToastr(400);
				return;
			}
			modalService.okModal(institution);
		}

		vm.updatePassword = function(user) {
      loginService.updatePassword(user.username, user.password).then(function(status) {
        toastrService.showToastr(status);
      });
    }

		vm.closeModal = function() {
			modalService.closeModal();
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
