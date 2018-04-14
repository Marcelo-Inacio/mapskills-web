(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('ProfileController', ProfileController);

	/** @ngInject */
	function ProfileController(studentService, toastrService, adminService, loginService, $filter) {
		var vm = this;
		vm.checkboxPassword = false;
		vm.showPassword = {"true" : "text", "false" : "password"};

		function init() {
      vm.user = loginService.getUserLogged();
			translateCoursePeriod(vm.user);
		}

    vm.updatePassword = function(user) {
      loginService.updatePassword(user.username, user.password).then(function(status) {
        toastrService.showToastr(status);
      });
    }

		function translateCoursePeriod(user) {
			if (user.profile == 'STUDENT') {
				user.course.period = $filter('translate')(user.course.period);
			}
		}

		init();

	}
})();
