(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('studentService', ['$log', '$http', '$q', 'HelperService', 'loginService', studentService]);

		/** @ngInject */
		function studentService($log, $http, $q, HelperService, loginService) {
			return {
				sendAnswer : _sendAnswer,
				sendEmail : _sendEmail,
				getHistory : _getHistory,
				getRadarResults : _getRadarResults,
				validateProfile : _validateProfile
			};
/** retorna url default do server  */
		function getFullRestApi(uri) {
			return HelperService.getFullRestApi("/student").concat(uri);
		}

		function _validateProfile() {
			loginService.validateProfile("STUDENT");
		}

		function _getRadarResults(studentId) {
			var deferred = $q.defer();
			var uri = getFullRestApi("/game/result/").concat(studentId);
			$http.get(uri).success(function(response) {
				deferred.resolve(response);
			});
			return deferred.promise;
		}

		function _getHistory(studentId) {
			var deferred = $q.defer();
			var uri = getFullRestApi("/game/").concat(studentId);
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
					method: 'POST',	url: getFullRestApi("/game/answer"),
					headers: {'Content-Type': 'application/json'},
					data: answerContext
				}).then(function success(response) {
					deferred.resolve(response.status);
				});
				return deferred.promise;
			}
			/** realiza o envio de email ao fim do game */
			function _sendEmail() {
			}
		}
})();
