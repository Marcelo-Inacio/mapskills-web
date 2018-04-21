(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController(toastr, toastrService, loginService) {
		var vm = this;

		/** realiza login na aplicação */
		vm.login = function (login) {
			if (login.username == null || login.password == null) {
				messageError();
				return;
			}
			loginService.login(login);
		}

		/** realiza logout na aplicação, limpando os registros do usuario*/
		vm.logout = function () {
			loginService.logout();
		}

		function messageError() {
			toastr.error('Informe suas credenciais corretamente.', 'Ops!');
		}

	}
})();
