(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('AdminProfileController', AdminProfileController);

	/** @ngInject */
	function AdminProfileController($log, studentService, toastrService, adminService, loginService) {
		var vm = this;

		function init() {
			adminService.validateProfile();
      vm.user = loginService.getUserLogged();
		}

    vm.updatePassword = function(user) {
      loginService.updatePassword(user.username, user.password).then(function(status) {
        $log.log(status);
        toastrService.showToastr(status);
      });
    }

		init();

	}
})();
