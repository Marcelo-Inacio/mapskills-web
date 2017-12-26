(function() {
	"use strict";

	angular
		.module("mapskillsWeb")
		.factory("adminService", adminService);

		/** @ngInject */
		function adminService($log, $http, $q, HelperService, loginService, API_SERVER) {
			var _dashboard = {
				level : function(level) {
					var deferred = $q.defer();
					var uri = API_SERVER.REPORT.LOCAL;
					$http.get(uri, {
						params: {
							institutionLevel: level
						}
					}).then(function(response) {
						deferred.resolve(response.data);
					});
					return deferred.promise;
				},
				global : function() {
					var deferred = $q.defer();
					var uri = API_SERVER.REPORT.GLOBAL;
					$http.get(uri).then(function(response) {
						deferred.resolve(response.data);
					});
					return deferred.promise;
				}
			};

			var allSkillsCached = null;
			var allScenesCached = null;
			var allInstitutionsCached = null;
			var objectCurrent = null;

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
				/** auxiliares */
				getObjectCurrent : _getObjectCurrent,
				setObjectCurrent : _setObjectCurrent,
				getSkillById : _getSkillById,
				validateProfile : _validateProfile
			};

			function _getObjectCurrent() {
				return objectCurrent;
			}

			function _setObjectCurrent(object) {
				objectCurrent = object;
			}

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
/** auxilia para recuperar objeto skill, para exibir no editar da question*/
			function _getSkillById(id) {
				var size = allSkillsCached.length;
				for(var i = 0; i < size; i++) {
					if(allSkillsCached[i].id == id) {
						return allSkillsCached[i];
					}
				}
				return null;
			}

			function _getInstitutionDetails(institutionId) {
				var deferred = $q.defer();
				var uri = API_SERVER.INSTITUTION.BY_ID.replace("{id}", institutionId);
				$http.get(uri).then(function(response) {
					objectCurrent = response.data;
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
        }).
         then(function success(response) {
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
				$log.log(scene);
				var deferred = $q.defer();
				var restContext = getRestContext(scene, API_SERVER.THEME);
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
				$log.log(skill);
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
			/** método que realiza a reordenação dos index das cenas */
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
			/** excluir uma questão de uma cena */
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
/* função que chama requisição para remoção de uma questão de uma cena */
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
			/** traz todas cenas de um determinado tema pelo id e simula um cache
			para em caso de reload não sofra com requisição ao server */
			function _loadScenesByThemeId(themeId, fromServer) {
				var deferred = $q.defer();
				if(sceneCachedVerify(themeId) && !fromServer) {
					deferred.resolve(allScenesCached);
				} else {
					var uri = API_SERVER.THEME.BY_ID.replace("{id}", themeId);
					$http.get(uri).then(function(response) {
						if(response.data.length != 0) allScenesCached = response.data;
						deferred.resolve(response.data);
					});
				}
				return deferred.promise;
			}

			function sceneCachedVerify(themeId) {
				if(allScenesCached != null) {
					if (allScenesCached[0].gameThemeId == themeId) return true;
				}
				return false;
			}

			/** cadastra um tema */
			function _saveTheme(theme) {
				$log.log(theme);
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
			/** recupera todos as instituições cadastadas */
			function _loadAllInstitutions(loadFromServer) {
				var deferred = $q.defer();
				if(allInstitutionsCached != null && !loadFromServer) {
					deferred.resolve(allInstitutionsCached);
				} else {
					var uri = API_SERVER.INSTITUTION.ALL;
					$http.get(uri).then(function(response) {
						allInstitutionsCached = response.data;
						deferred.resolve(response.data);
					});
				}
				return deferred.promise;
			}
			/** recupera todos as competencias cadastadas e simula um cache */
			function _loadAllSkills(loadFromServer) {
				var deferred = $q.defer();
				if(allSkillsCached != null && !loadFromServer) {
					deferred.resolve(allSkillsCached);
					$log.log("== SKILL CACHED ==");
				} else {
					$log.log("== SKILL FROM SERVER ==");
					var uri = API_SERVER.SKILL.ALL;
					$http.get(uri).then(function(response) {
						allSkillsCached = response.data;
						deferred.resolve(response.data);
					});
				}
				return deferred.promise;
			}
			/** recupera todos temas cadastrados */
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
