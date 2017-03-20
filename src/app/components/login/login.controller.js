(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController(toastr, toastrService, cfpLoadingBar, loginService) {
		var vm = this;
		vm.userLogin = {username: null, password: null};

		/** realiza login na aplicação */
		vm.login = function (loginObj) {
			if(loginObj.username == null || loginObj.password == null) {
				messageError();
				return;
			}
			loginService.login(loginObj).then(function(response) {
				if(response.status !== 200) {
					cfpLoadingBar.complete();
					toastrService.showToastr(response.status);
				}
				return response;
			}).then(function(response) {
				if(response.status !== 200) {
					return;
				}
				loginService.setUserContext(loginObj.username);
			});
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
