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
				loadScenesByThemeId : _loadScenesByThemeId,
				deleteQuestion : _deleteQuestion,
				deleteScene : _deleteScene,
				getInstitutionDetails : _getInstitutionDetails,

				getObjectCurrent : _getObjectCurrent,
				setObjectCurrent : _setObjectCurrent
			};

			var objectCurrent;

			function _getObjectCurrent() {
				return objectCurrent;
			}

			function _setObjectCurrent(object) {
				objectCurrent = object;
			}

			function _getInstitutionDetails(id) {
				return $http.get("./app/components/admin/repository/institutionDetails.json");
			}

			function _saveInstitution(institution) {
				$log.log(institution);
				var jsonData = JSON.stringify(institution);
				var deferred = $q.defer();
        $http({
            method: "POST", url: "http://localhost:8080/mapskills/rest/institution",
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         success(function (status) {
             deferred.resolve(status);
         });
        return deferred.promise;
			}

			function _sendFile(file) {
				$log.log(file);
				var jsonData = JSON.stringify(file);
				var deferred = $q.defer();
        $http({
            method: "POST", url: "http://localhost:8080/mapskills/rest/upload/institutions",
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         success(function (status) {
             deferred.resolve(status);
         });
        return deferred.promise;
			}

			function _saveScene(scene) {
				var jsonData = JSON.stringify(scene);
				var deferred = $q.defer();
        $http({
            method: "POST", url: "http://localhost:8080/mapskills/rest/game/scene",
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         success(function (status) {
             deferred.resolve(status);
         });
        return deferred.promise;
			}

			function _saveSkill(skill) {
				$log.log(skill);
				var jsonData = JSON.stringify(skill);
				var deferred = $q.defer();
        $http({
            method: "POST", url: "http://localhost:8080/mapskills/rest/skill",
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         success(function (status) {
             deferred.resolve(status);
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
				var jsonData = JSON.stringify(allScenes);
				var deferred = $q.defer();
        $http({
            method: "PUT", url: "http://localhost:8080/mapskills/rest/game/scenes",
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         success(function (status) {
             deferred.resolve(status);
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
			/** traz todas cenas de um determinado tema pelo id*/
			function _loadScenesByThemeId(themeId) {
				var deferred = $q.defer();
				$http.get("http://localhost:8080/mapskills/rest/game/theme/".concat(themeId)).success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}

			/** cadastra ou atualiza um tema */
			function _saveTheme(theme) {
				$log.log(theme);
				var jsonData = JSON.stringify(theme);
				var deferred = $q.defer();
        $http({
            method: "POST", url: "http://localhost:8080/mapskills/rest/game/theme",
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         success(function (status) {
             deferred.resolve(status);
         });
        return deferred.promise;
			}
			/** recupera todos as instituições cadastadas */
			function _loadAllInstitutions() {
				var deferred = $q.defer();
				$http.get("./app/components/admin/repository/institutions.json").success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
			/** recupera todos as competencias cadastadas */
			function _loadAllSkills() {
				var deferred = $q.defer();
				$http.get("./app/components/admin/repository/skills.json").success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
			/** recupera todos temas cadastrados */
			function _loadAllThemes() {
				var deferred = $q.defer();
				$http.get("./app/components/admin/repository/themes.json").success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
		}
})();
