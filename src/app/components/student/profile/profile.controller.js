(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StudentProfileController', StudentProfileController);

	/** @ngInject */
	function StudentProfileController($log, studentService, toastrService, loginService) {
		var vm = this;

		init();

		function init() {
			studentService.validateProfile();
      vm.user = loginService.getUserLogged();
		}

    vm.updatePassword = function(user) {
      loginService.updatePassword(user.username, user.password).then(function(status) {
        $log.log(status);
        toastrService.showToastr(status);
      });
    }

	}
})();
