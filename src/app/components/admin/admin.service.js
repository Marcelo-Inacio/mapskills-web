(function() {
	"use strict";

	angular
		.module("mapskillsWeb")
		.factory("adminService", adminService);

		/** @ngInject */
		function adminService($http, $q, HelperService, loginService, API_SERVER) {
			var _dashboard = {
				level : function(filter) {
					var deferred = $q.defer();
					var uri = API_SERVER.REPORT.LOCAL;
					$http.get(uri, {params: filter}).then(function success(response) {
						deferred.resolve(response.data);
					}, function error(response) {
						deferred.reject(response);
					});
					return deferred.promise;
				},
				global : function(filter) {
					var deferred = $q.defer();
					var uri = API_SERVER.REPORT.GLOBAL;
					$http.get(uri, {params: filter}).then(function success(response) {
						deferred.resolve(response.data);
					}, function error(response) {
						deferred.reject(response);
					});
					return deferred.promise;
				}
			};

			return {
				loadAllSkills : _loadAllSkills,
				loadAllThemes : _loadAllThemes,
				loadAllInstitutions : _loadAllInstitutions,
				saveTheme : _saveTheme,
				saveSkill : _saveSkill,
				saveScene : _saveScene,
				saveInstitution : _saveInstitution,
				sendFile : _sendFile,
				updateIndexScenes : _updateIndexScenes,
				updateThemeStatus : _updateThemeStatus,
				loadScenesByThemeId : _loadScenesByThemeId,
				deleteQuestion : _deleteQuestion,
				deleteScene : _deleteScene,
				getInstitutionDetails : _getInstitutionDetails,
				dashboard : _dashboard,

				validateProfile : _validateProfile
			};

			function getRestContext(object, URL_BASE) {
				var restContext = {method: null, url: null};
				if (object.id) {
					restContext.method = "PUT";
					restContext.url = URL_BASE.UPDATE.replace("{id}", object.id);
				} else {
					restContext.method = "POST";
					restContext.url = URL_BASE.SAVE;
				}
				return restContext;
			}

			function _getInstitutionDetails(institutionId) {
				var deferred = $q.defer();
				var uri = API_SERVER.INSTITUTION.BY_ID.replace("{id}", institutionId);
				$http.get(uri).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			function _saveInstitution(institution) {
				var deferred = $q.defer();
				var restContext = getRestContext(institution, API_SERVER.INSTITUTION);

				var jsonData = angular.toJson(institution);
				$http({method: restContext.method, url: restContext.url,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).then(function success(response) {
					deferred.resolve(response);
				}, function error(response) {
					deferred.resolve(response);
				});
        return deferred.promise;
			}

			function _sendFile(file) {
				var jsonData = angular.toJson(file);
				var deferred = $q.defer();
        $http({
            method: "POST", url: API_SERVER.INSTITUTION.UPLOAD,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function(response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			function _saveScene(scene) {
				var deferred = $q.defer();
				var restContext = API_SERVER.SCENE.getRestContext(scene);
				var jsonData = angular.toJson(scene);
        $http({
            method: restContext.method, url: restContext.url,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			function _saveSkill(skill) {
				var deferred = $q.defer();
				var restContext = getRestContext(skill, API_SERVER.SKILL);
				var jsonData = angular.toJson(skill);
				$http({
            method: restContext.method, url: restContext.url,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			/**
			* Realiza a reordenação dos index das cenas
			*/
			function _updateIndexScenes(themeId, allScenes) {
				var jsonData = angular.toJson(allScenes);
				var deferred = $q.defer();
        $http({
            method: "PUT", url: API_SERVER.THEME.UPDATE_SCENES.replace("{themeId}", themeId),
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			/**
			* Remove uma questão de uma cena
			*/
			function _deleteQuestion(themeId, sceneId) {
				var deferred = $q.defer();
				$http({
					method: "DELETE",
					url: API_SERVER.THEME.DELETE_QUESTION.replace("{themeId}", themeId).replace("{sceneId}", sceneId)
				})
				.then(function (response) {
					deferred.resolve(response.status);
				});
				return deferred.promise;
			}

			/**
			* Requisição para remoção de uma questão de uma cena
			*/
			function _deleteScene(themeId, sceneId) {
				var deferred = $q.defer();
        $http({
            method: "DELETE",
						url: API_SERVER.THEME.DELETE_SCENE.replace("{themeId}", themeId).replace("{sceneId}", sceneId)
        })
				.then(function (response) {
					deferred.resolve(response.status);
				});
				return deferred.promise;
			}

			/**
			* Traz todas cenas de um determinado tema pelo id
			*/
			function _loadScenesByThemeId(themeId) {
				var deferred = $q.defer();
				var uri = API_SERVER.THEME.BY_ID.replace("{id}", themeId);
				$http.get(uri).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			/**
			* Cadastra um tema
			*/
			function _saveTheme(theme) {
				var jsonData = angular.toJson(theme);
				var deferred = $q.defer();
        $http({
            method: "POST", url: API_SERVER.THEME.SAVE,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			function _updateThemeStatus(themeId, newStatus) {
				var deferred = $q.defer();
				var uri = API_SERVER.THEME.UPDATE_STATUS.replace("{id}", themeId);
				$http.put(uri, null, {params: {status: newStatus}}).
         then(function (response) {
           deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			/**
			* Recupera todos as instituições cadastadas
			*/
			function _loadAllInstitutions() {
				var deferred = $q.defer();
				var uri = API_SERVER.INSTITUTION.ALL;
				$http.get(uri).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			/**
			* Recupera todos as competencias cadastadas e simula um cache
			*/
			function _loadAllSkills() {
				var deferred = $q.defer();
				var uri = API_SERVER.SKILL.ALL;
				$http.get(uri).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			/**
			* Recupera todos temas cadastrados
			*/
			function _loadAllThemes() {
				var deferred = $q.defer();
				var uri = API_SERVER.THEME.ALL;
				$http.get(uri).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			function _validateProfile() {
				loginService.validateProfile("ADMINISTRATOR");
			}
		}
})();
