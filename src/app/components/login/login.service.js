(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('loginService', loginService);

		/** @ngInject */
		function loginService($http, $q, $location, $state, $log, Session, HelperService, API_SERVER) {
			return {
				login : _login,
				logout : _logout,
				updatePassword : _updatePassword,
				setUserContext : _setUserContext,
				validateProfile : _validateProfile,
				isLogged : _isLogged,
				getUserLogged : _getUserLogged
			};

			/** Função que realiza uma chamada ao serviço back-end de login
			para autenticação do usuário, em caso de sucesso é retornado
			o Token JWT no header do response. */
			function _login(login) {
				var deferred = $q.defer();
				$http({
					method: 'POST', url: API_SERVER.LOGIN,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					params: {username: login.username, password: login.password}
				})
				.then(function success(response) {
						var token = response.headers("Authorization");
						Session.createToken(token);
						deferred.resolve(response);
				}, function error(response) {
						deferred.resolve(response);
				});
				return deferred.promise;
			}

			function _setUserContext(username) {
				$http({
					method: 'GET', url: API_SERVER.USER,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					params: {username: username}
				})
				.then(function success(response) {
					$log.info("== THEN SUCCESS ==");
					var userDetails = response.data;
					Session.createUser(userDetails);
					_redirect(userDetails.profile);
				}, function error(response) {
						$log.info(response.status);
				});
			}

			function _updatePassword(loginUsername, newPassword) {
				var deferred = $q.defer();
				$http({
					method: 'PUT', url: API_SERVER.USER,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					params: {username: loginUsername, newPassword: newPassword}
				})
				.then(function success(response) {
						$log.info("== THEN SUCCESS ==");
						deferred.resolve(response.status);
				}, function error(response) {
						$log.info(response.status);
						deferred.resolve(response.status);
				});
				return deferred.promise;
			}
/** ao realizar logout limpa todas informações contidas no storage */
			function _logout() {
				_validateProfile(null);
			}
/** retorna se ha um usuario logado */
			function _isLogged() {
				return Session.hasSession();
			}
/** identifica o usuario logado, para ver as permissoes de acesso */
			function _validateProfile(profile) {
				var user = Session.refreshUserSession();
/** resolve um chain de verificação */
				if(user == null || profile == null || profile !== user.profile) {
					toLogin();
				}
			}
/** limpa storage e redireciona para login */
			function toLogin() {
				Session.destroy();
				$state.go("login");
			}
/** redireciona o usuário de acordo com perfil recebido como parâmetro */
			function _redirect(profile) {
				$log.info(profile);
				switch(profile) {
					case 'ADMINISTRATOR':
						$state.go('admin.dashboard');
						break;
					case 'MENTOR':
						$state.go('mentor.dashboard');
						break;
					case 'STUDENT':
						$state.go('student.game');
						break;
					default:
						$state.go('login');
						break;
				}
			}

			function _getUserLogged() {
				return Session.refreshUserSession();
			}
		}
})();
