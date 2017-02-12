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
      var user = loginService.getUserLogged();
      loginService.validateProfile("STUDENT");
			studentService.getStudentDetails(user.ra).then(function(response) {
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
