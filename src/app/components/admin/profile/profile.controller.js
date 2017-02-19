(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminProfileController', AdminProfileController);

	/** @ngInject */
	function AdminProfileController($log, studentService, toastrService, loginService) {
		var vm = this;
		init();

		function init() {
			adminService.validateProfile();
      var user = loginService.getUserLogged();
			adminService.getAdminDetails(user.id).then(function(response) {
				$log.log(response);
        vm.user = response;
			});
		}

    vm.updatePassword = function(user) {
      loginService.updatePassword(user.username, user.password).then(function(status) {
        $log.log(status);
        toastrService.showToastr(status);
      });
    }

	}

})();
