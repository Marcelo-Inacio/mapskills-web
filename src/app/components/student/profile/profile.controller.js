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
      var user = loginService.getUserLogged();
			var uri = "/student/details/".concat(user.ra);
			loginService.getUserDetails(uri).then(function(response) {
        vm.user = response;
			});
		}

		vm.setFocus = function(_event) {
			$log.log(_event);
			_event.currentTarget.classList.add("md-input-focused");
			$log.log(_event);
		}

    vm.updatePassword = function(user) {
      loginService.updatePassword(user.username, user.password).then(function(status) {
        $log.log(status);
        toastrService.showToastr(status);
      });
    }

	}

})();
