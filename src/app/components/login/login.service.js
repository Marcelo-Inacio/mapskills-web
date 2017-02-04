(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('loginService', ['$http', '$q', '$location', '$state', '$log', 'Session', loginService]);

		/** @ngInject */
		function loginService($http, $q, $location, $state, $log, Session) {
			return {
				login : _login,
				logout : _logout,
				setUserContext : _setUserContext,
				validateProfile : _validateProfile,
				isLogged : _isLogged,
				getUserLogged : _getUserLogged
			};

			function getFullRestApi(uri) {
				return "http://localhost:8585/mapskills".concat(uri);
			}
			/** realiza uma chamada ao back end para autenticar o login*/
			function _login(loginObj) {
				var deferred = $q.defer();
		    $http({
		        method: 'POST', url: getFullRestApi("/login"),
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		        params: {username: loginObj.username, password: loginObj.password}
		    }).then(function success(response) {
						$log.info("== THEN SUCCESS ==");
						var token = response.headers("Authorization");
						$log.info(token);
						Session.createToken(token);
						deferred.resolve(response);
				}, function error(response){
						$log.info(response);
						deferred.resolve(response);
				});
				return deferred.promise;
			}

			function _setUserContext(loginUsername) {
		    $http({
		        method: 'POST', url: getFullRestApi("/user/details"),
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		        params: {username: loginUsername}
		    }).then(function success(response) {
						$log.info("== THEN SUCCESS ==");
						var userDetails = response.data;
						Session.createUser(userDetails);
						_redirect(userDetails.profile);
				}, function error(response) {
						$log.info(response.status);
				});
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
				if(user == null) toLogin();
				if(profile == null) toLogin();
				if(profile !== user.profile) toLogin();
				return true;
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
