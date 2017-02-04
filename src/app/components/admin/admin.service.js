(function() {
	"use strict";

	angular
		.module("mapskillsWeb")
		.factory("adminService", ["$log", "$http", "$q", adminService]);

		/** @ngInject */
		function adminService($log, $http, $q) {
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
				updateThemes : _updateThemes,
				loadScenesByThemeId : _loadScenesByThemeId,
				deleteQuestion : _deleteQuestion,
				deleteScene : _deleteScene,
				getInstitutionDetails : _getInstitutionDetails,
				/** auxiliares */
				getObjectCurrent : _getObjectCurrent,
				setObjectCurrent : _setObjectCurrent,
				getSkillById : _getSkillById
			};

			function getFullRestApi(uri) {
				return "http://localhost:8585/mapskills/admin".concat(uri);
			}

			var allSkillsCached = null;
			var allScenesCached = null;
			var allInstitutionsCached = null;
			var objectCurrent = null;

			function _getObjectCurrent() {
				return objectCurrent;
			}

			function _setObjectCurrent(object) {
				objectCurrent = object;
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
				var uri = getFullRestApi("/institution/").concat(institutionId);
				$http.get(uri).then(function(response) {
					objectCurrent = response.data;
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			function _saveInstitution(institution) {
				var jsonData = angular.toJson(institution);
				var deferred = $q.defer();
        $http({
            method: "POST", url: getFullRestApi("/institution"),
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			function _sendFile(file) {
				$log.log(file);
				var jsonData = angular.toJson(file);
				var deferred = $q.defer();
        $http({
            method: "POST", url: getFullRestApi("/upload/institutions"),
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function(response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			function _saveScene(scene, method) {
				$log.log(scene);
				var deferred = $q.defer();
				var jsonData = angular.toJson(scene);
        $http({
            method: method, url: getFullRestApi("/game/scene"),
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			function _saveSkill(skill) {
				$log.log(skill);
				var jsonData = angular.toJson(skill);
				var deferred = $q.defer();
        $http({
            method: "POST", url: getFullRestApi("/skill"),
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}
			/** método que realiza a reordenação dos index das cenas */
			function _updateIndexScenes(allScenes) {
				angular.forEach(allScenes, function(value, key) {
					value.index = key;
					$log.log(key + " : " + value.index);
				});
				$log.log(allScenes);
				var jsonData = angular.toJson(allScenes);
				var deferred = $q.defer();
        $http({
            method: "PUT", url: getFullRestApi("/game/scenes"),
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}
			/** excluir uma questão de uma cena */
			function _deleteQuestion(questionId) {
				$log.log("ID DA QUESTÃO: " + questionId);
			}
			function _deleteScene(sceneId) {
				$log.log("ID DA CENA: " + sceneId);
			}
			/** traz todas cenas de um determinado tema pelo id e simula um cache
			para em caso de reload não sofra com requisição ao server */
			function _loadScenesByThemeId(themeId) {
				var deferred = $q.defer();
				if(sceneCachedVerify(themeId)) {
					deferred.resolve(allScenesCached);
				} else {
					var uri = getFullRestApi("/game/theme/");
					$http.get(uri.concat(themeId)).then(function(response) {
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
            method: "POST", url: getFullRestApi("/game/theme"),
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
             deferred.resolve(response.status);
         });
        return deferred.promise;
			}
			function _updateThemes(themes) {
				var jsonData = angular.toJson(themes);
				var deferred = $q.defer();
        $http({
            method: "PUT", url: getFullRestApi("/game/themes"),
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
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
					var uri = getFullRestApi("/institutions");
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
					$log.log("== SKILL FORCE ==");
					var uri = getFullRestApi("/skills");
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
				var uri = getFullRestApi("/game/themes");
				$http.get(uri).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}
		}
})();
