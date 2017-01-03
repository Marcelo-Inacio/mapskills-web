(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('fileService', ['$http', '$q', fileService]);

		/** @ngInject */
		function fileService($http, $q) {
			return {
				sendXlsxFile : _sendXlsxFile
				//sendImageFile : _sendImageFile
			};

			/** realiza uma post ao back end enviando um de imagem para o jogo*/
			function _sendXlsxFile(fileContext) {
				$http({
					method: 'POST',
					url: '/upload/students',
					headers: {'Content-Type': 'application/json'},
					data: fileContext
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

		}
})();
