(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorProfileController', MentorProfileController);

	/** @ngInject */
	function MentorProfileController($log, mentorService, studentService, toastrService, loginService) {
		var vm = this;
		init();

		function init() {
			mentorService.validateProfile();
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
