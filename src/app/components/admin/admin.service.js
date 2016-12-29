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
				saveNewTheme : _saveNewTheme,
				updateThemes : _updateThemes,
				loadScenesByThemeId : _loadScenesByThemeId,
				deleteQuestion : _deleteQuestion
			};
			/** excluir uma questão de uma cena */
			function _deleteQuestion(questionId) {
				console.log("ID DA QUESTÃO: " + questionId);
			}
			/** traz todas cenas de um determinado tema pelo id*/
			function _loadScenesByThemeId(themeId) {
				var deferred = $q.defer();
				return $http.get('./app/components/admin/repository/scenes.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
			/** atualiza a lista de temas */
			function _updateThemes(themes) {
				console.log(themes);
			}
			/** cadastra um novo tema */
			function _saveNewTheme(newTheme) {
				console.log(newTheme);
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
