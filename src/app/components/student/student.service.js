(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('studentService', studentService);

		/** @ngInject */
		function studentService($log, $http, $q, HelperService, loginService, API_SERVER) {
			return {
				sendAnswer : _sendAnswer,
				getHistory : _getHistory,
				getRadarResults : _getRadarResults,
				validateProfile : _validateProfile
			};

		function _validateProfile() {
			loginService.validateProfile("STUDENT");
		}

		function _getRadarResults(studentId) {
			var deferred = $q.defer();
			var uri = API_SERVER.STUDENT.RESULT.replace("{studentId}", studentId);
			$http.get(uri).success(function(response) {
				deferred.resolve(response);
			});
			return deferred.promise;
		}

		function _getHistory(studentId) {
			var deferred = $q.defer();
			var uri = API_SERVER.STUDENT.SCENE.replace("{id}", studentId);
			$http.get(uri).success(function(response) {
				deferred.resolve(response);
			});
			return deferred.promise;
		}

			/** realiza uma post ao back end enviando um contexto 'student_question_event'*/
			function _sendAnswer(answerContext) {
				$log.log(answerContext);
				var deferred = $q.defer();
				$http({
					method: 'POST',	url: API_SERVER.STUDENT.ANSWER,
					headers: {'Content-Type': 'application/json'},
					data: answerContext
				}).then(function success(response) {
					deferred.resolve(response.status);
				});
				return deferred.promise;
			}
		}
})();
