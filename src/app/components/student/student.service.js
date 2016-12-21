(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('StudentService', ['$http', '$q', '$log', StudentService]);

		/** @ngInject */
		function StudentService($http, $q, $log) {
			return {
				sendAnswer : _sendAnswer,
				sendEmail : _sendEmail,
				getHistory : _getHistory
			};

		function _getHistory() {
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
					url: /*urlPath +*/ '/send/answer',
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
