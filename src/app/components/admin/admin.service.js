(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('adminService', ['$log', '$http', '$q', adminService]);

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

			function _saveInstitution(institution) {
				$log.log(institution);
			}

			function _sendFile(file) {
				$log.log(file);
			}

			function _saveScene(scene) {
				$log.log(scene);
			}

			function _saveSkill(skill) {
				$log.log(skill);
			}
			/** método que realiza a reordenação dos index das cenas */
			function _updateIndexScenes(allScenes) {
				angular.forEach(allScenes, function(value, key) {
					value.index = key;
					$log.log(key + ' : ' + value.index);
				});
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
				$http.get('./app/components/admin/repository/scenes.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}

			/** cadastra ou atualiza um tema */
			function _saveTheme(theme) {
				$log.log(theme);
			}
			/** recupera todos as instituições cadastadas */
			function _loadAllInstitutions() {
				var deferred = $q.defer();
				$http.get('./app/components/admin/repository/institutions.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
			/** recupera todos as competencias cadastadas */
			function _loadAllSkills() {
				var deferred = $q.defer();
				$http.get('./app/components/admin/repository/skills.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
			/** recupera todos temas cadastrados */
			function _loadAllThemes() {
				var deferred = $q.defer();
				$http.get('./app/components/admin/repository/themes.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
		}
})();
