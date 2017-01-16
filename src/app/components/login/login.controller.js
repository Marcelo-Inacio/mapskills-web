(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController(toastr, loginService) {
		var vm = this;
		//var urlPath = getDefaultUrlPath();

		vm.userLogin = {username: null, password: null};

		/** realiza login na aplicação */
		vm.login = function (login) {
			if(login.username == null || login.password == null) {
				messageError();
				return;
			}
			var jsonData = angular.toJson(login);
			loginService.login(jsonData).then(function(response) {
				if(response.status != 200) messageError();
				else loginService.setUserContext(response.data, "_#tok$n#_");
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
