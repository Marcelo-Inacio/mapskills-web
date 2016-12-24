(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController(loginService) {
		var vm = this;
		//var urlPath = getDefaultUrlPath();

		vm.userLogin = {username: null, password: null};

		/** realiza login na aplicação */
		vm.login = function (login) {
			if(login.username == null || login.password == null) {
				alert('invalid login');
				return;
			}
			var json = angular.toJson(login);

			loginService.login(json);

		}
		/** realiza logout na aplicação, limpando os registros do usuario*/
		vm.logout = function () {
			loginService.logout();
		}

	}

})();
