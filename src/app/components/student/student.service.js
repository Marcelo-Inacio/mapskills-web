(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('studentService', ['$http', '$q', studentService]);

		/** @ngInject */
		function studentService($http, $q) {
			return {
				sendAnswer : _sendAnswer,
				sendEmail : _sendEmail,
				getHistory : _getHistory,
				getRadarResults : _getRadarResults
			};

		function _getRadarResults(/*studentId*/) {
			var deferred = $q.defer();
			return $http.get('./app/components/student/studentResult.json').success(function(response) {
				deferred.resolve(response);
			});
			return deferred.promise;
		}

		function _getHistory(/*studentId*/) {
			var deferred = $q.defer();
			return $http.get('./app/components/student/game.json').success(function(response) {
				deferred.resolve(response);
			});
			return deferred.promise;
		}

			/** realiza uma post ao back end enviando um contexto 'student_question_event'*/
			function _sendAnswer(answerContext) {
				$http({
					method: 'POST',
					url: '/send/answer',
					headers: {'Content-Type': 'application/json'},
					data: answerContext
				})
				.success(function () {
				})
				.then(function successCallback(response) {
					//deferred.resolve(response.data);
					//console.log(response.data);
				},
				function errorCallback() {
					alert('erro ao enviar resposta');
					//deferred.reject("no authentication");
				});
			}
			/** realiza o envio de email ao fim do game */
			function _sendEmail() {
			}
		}
})();
