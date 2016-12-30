(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('adminService', ['$http', '$q', adminService]);

		/** @ngInject */
		function adminService($http, $q) {
			return {
				loadAllSkills : _loadAllSkills,
				loadAllThemes : _loadAllThemes,
				loadAllInstitutions : _loadAllInstitutions,
				saveTheme : _saveTheme,
				saveSkill : _saveSkill,
				saveScene : _saveScene,
				saveInstitution : _saveInstitution,
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
				console.log(institution);
			}

			function _saveScene(scene) {
				console.log(scene);
			}

			function _saveSkill(skill) {
				console.log(skill);
			}
			/** método que realiza a reordenação dos index das cenas */
			function _updateIndexScenes(allScenes) {
				angular.forEach(allScenes, function(value, key) {
					value.index = key;
				  console.log(key + ' : ' + value.index);
				});
			}
			/** excluir uma questão de uma cena */
			function _deleteQuestion(questionId) {
				console.log("ID DA QUESTÃO: " + questionId);
			}
			function _deleteScene(sceneId) {
				console.log("ID DA CENA: " + sceneId);
			}
			/** traz todas cenas de um determinado tema pelo id*/
			function _loadScenesByThemeId(themeId) {
				var deferred = $q.defer();
				return $http.get('./app/components/admin/repository/scenes.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}

			/** cadastra ou atualiza um tema */
			function _saveTheme(theme) {
				console.log(theme);
			}
			/** recupera todos as instituições cadastadas */
			function _loadAllInstitutions() {
				var deferred = $q.defer();
				return $http.get('./app/components/admin/repository/institutions.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
			/** recupera todos as competencias cadastadas */
			function _loadAllSkills() {
				var deferred = $q.defer();
				return $http.get('./app/components/admin/repository/skills.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
			/** recupera todos temas cadastrados */
			function _loadAllThemes() {
				var deferred = $q.defer();
				return $http.get('./app/components/admin/repository/themes.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
		}
})();
