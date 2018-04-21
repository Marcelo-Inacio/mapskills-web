(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('loginService', loginService);

		/** @ngInject */
		function loginService($http, $q, $location, $state, toastrService, Session, HelperService, API_SERVER) {

			var redirections = {
				'ADMINISTRATOR': function() { $state.go('admin.dashboard'); },
				'MENTOR': function() { $state.go('mentor.dashboard'); },
				'STUDENT': function() { $state.go('student.game'); }
			}

			return {
				login : _login,
				logout : _logout,
				updatePassword : _updatePassword,
				validateProfile : _validateProfile,
				isLogged : _isLogged,
				getUserLogged : _getUserLogged
			};

			/**
			 * Função que realiza uma chamada ao serviço back-end de login
			 * para autenticação do usuário, em caso de sucesso é retornado
			 * o Token JWT no header do response.
			 */
			function _login(login) {
				$http({
					method: "POST", url: API_SERVER.LOGIN,
					headers: {"Content-Type": "application/x-www-form-urlencoded"},
					params: {username: login.username, password: login.password}
				})
				.then(function success(response) {
						Session.createToken("Basic bWFwc2tpbGxzOm1hcHNraWxscw==");
						var userDetails = angular.fromJson(decodeURIComponent(response.data.replace(/\+/g, ' ')));
						Session.createUser(userDetails);
						_redirect(userDetails.profile);
				}, function error(response) {
						toastrService.showToastr(response.status);
				});
			}

			function _updatePassword(loginUsername, newPassword) {
				var deferred = $q.defer();
				$http({
					method: "PUT", url: API_SERVER.USER,
					headers: {"Content-Type": "application/x-www-form-urlencoded"},
					params: {username: loginUsername, newPassword: newPassword}
				})
				.then(function success(response) {
						deferred.resolve(response.status);
				}, function error(response) {
						deferred.reject(response.status);
				});
				return deferred.promise;
			}
			/**
			 * Ao realizar logout limpa todas informações contidas no storage
			 */
			function _logout() {
				_validateProfile(null);
			}
			/**
			 * Retorna se ha um usuario logado
			 */
			function _isLogged() {
				return Session.hasSession();
			}
			/**
			 * Identifica o usuario logado, para ver as permissoes de acesso
			 */
			function _validateProfile(profile) {
				var user = Session.refreshUserSession();
				/**
				 * Resolve um chain de verificação
				 */
				if(user == null || profile == null || profile !== user.profile) {
					toLogin();
				}
			}
			/**
			 * Limpa storage e redireciona para login
			 */
			function toLogin() {
				Session.destroy();
				$state.go("login");
			}
			/**
			 * Redireciona o usuário de acordo com perfil recebido como parâmetro
			 */
			function _redirect(profile) {
				redirections[profile]();
			}

			function _getUserLogged() {
				return Session.refreshUserSession();
			}
		}
})();
