(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('loginService', ['$http', '$q', '$location', '$state', '$log', 'storageService', loginService]);

		/** @ngInject */
		function loginService($http, $q, $location, $state, $log, storageService) {
			return {
				login : _login,
				logout : _logout,
				setUserContext : _setUserContext,
				validateProfile : _validateProfile,
				isLogged : _isLogged
			};

			function getFullRestApi(uri) {
				return "http://localhost:8080/mapskills/rest".concat(uri);
			}
			/** realiza uma chamada ao back end para autenticar o login*/
			function _login(login) {
				$log.info(login);
				var deferred = $q.defer();
		    $http({
		        method: 'POST', url: getFullRestApi("/login"),
		        headers: {'Content-Type': 'application/json'},
		        data: login
		        //params: {username: usuario.username, password: usuario.password}
		    }).then(function success(response) {
						$log.info(response);
						deferred.resolve(response);
				}, function error(response){
						$log.info(response);
						deferred.resolve(response);
				});
				return deferred.promise;
			}
			function _setUserContext(user, token) {
				//storageService.setItem('Authorization', token);
				storageService.setItem('user', user);
				_redirect(user.profile);
			}
/** ao realizar logout limpa todas informações contidas no storage */
			function _logout() {
				_validateProfile(null);
			}
/** retorna se ha um usuario logado */
			function _isLogged() {
				return storageService.getItem('user') != null;
			}
/** identifica o usuario logado, para ver as permissoes de acesso */
			function _validateProfile(profile) {
				var user = storageService.getItem('user');
/** resolve um chain de verificação */
				if(user == null) toLogin();
				if(profile == null) toLogin();
				if(profile !== user.profile) toLogin();
				return true;
			}
/** limpa storage e redireciona para login */
			function toLogin() {
				storageService.removeAll();
				$state.go("login");
			}
/** redireciona o usuário de acordo com perfil recebido como parâmetro */
			function _redirect(profile) {
				$log.info(profile)
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
		}
})();
