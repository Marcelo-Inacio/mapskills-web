(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('LoginService', ['$http', '$q', '$location', '$state', LoginService]);

		/** @ngInject */
		function LoginService($http, $q, $location, $state) {
			return {
  				login : _login,
  				logout : _logout,
  				validate : _validate,
  				isLogged : _isLogged
			};

			/** realiza uma chamada ao back end para autenticar o login*/
			function _login(login) {
				console.error(login);
//				var deferred = $q.defer();

/*			    $http({
			        method: 'POST',
			        url: getDefaultUrlPath() + '/login',
			        headers: {'Content-Type': 'application/json'},
			        data: login
			        //params: {username: usuario.username, password: usuario.password}
			    })
				.success(function (data, status, headers, config) {
//		        	var user = data;
//		        	StorageHelper.setItem('Authorization', headers("Authorization"));
//		        	StorageHelper.setItem('user', user);
//		        	_redirect(user.profile);
				})
				.then(function successCallback(response) {
			      	//deferred.resolve(response.data);
			      	console.log(response.data);
	      		},
	      		function errorCallback(response) {
	      			alert('erro ao fazer login');
			     	//deferred.reject("no authentication");
	      		});*/
	        	_redirect("STUDENT");
			}
			/** ao realizar logout limpa todas informações contidas no storage */
			function _logout() {
  				StorageHelper.removeItem('Authorization');
  				StorageHelper.removeItem('user');
  				StorageHelper.removeItem('page');
  				_validate(null);
			}
			/** retorna se ha um usuario logado */
			function _isLogged() {
				  return StorageHelper.getItem('user') != null;
			}
			/** identifica o usuario logado, para ver as permissoes de acesso */
			function _validate(profile) {
		        var user = StorageHelper.getItem('user');

				/** se não houver identificação ou se não for o perfil informado redireciona para login */
		        if(profile == null || user.profile === null || profile !== user.profile) {
		        	$state.go("home.login");
		        }
			}
			/** função que redireciona o usuário de acordo com perfil recebido como parâmetro */
			function _redirect(profile) {
  				console.log(profile)
  				switch(profile) {
    					case 'ADMINISTRATOR':
    						//$state.go('admin.dashboard');
    						break;
    			    case 'MENTOR':
    			    	console.log("mentor.dashboard");
    			    	//$state.go('mentor.dashboard');
    			    	break;
    			    case 'STUDENT':
    			    	console.log("estudante");
    			    	$state.go('home.game');
    			    	break;
    			    default:
    			    	$state.go('home.login');
    			      break;
  				}
			}
		}
})();
