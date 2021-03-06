(function() {
	'use strict';

  angular
		.module('mapskillsWeb')
		.factory('downloadService',  downloadService);

		/** @ngInject */
		function downloadService($log, $q, $http, HelperService, $document) {
      return {
				template : _template,
				image : _image,
				download : _download
			};

      function _template(fileName) {
				$log.log($document);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        $http({
            url: "assets/templates/".concat(fileName), method: "GET",
            headers: {'Content-type': 'application/json'},
            responseType: 'arraybuffer'
        }).success(function (data) {
            var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(objectUrl);
        }).error(function (status) {
            $log.error(status);
        });
      }

			function _download(filter) {
				var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        $http({
            url: HelperService.getFullRestApi('/report/download'), method: "POST",
            headers: {'Content-type': 'application/json; charset=utf-8'},
						data: angular.toJson(filter), responseType: 'arraybuffer'
        }).success(function (data) {
            var blob = new Blob([data], {type: "text/csv"});
            var objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = "report.csv";
            a.click();
            window.URL.revokeObjectURL(objectUrl);
        }).error(function (status) {
            $log.error(status);
        });
			}

			function _image(sceneNumber) {
				var deferred = $q.defer();
        $http({
            url: "http://localhost:8585/image/".concat(sceneNumber), method: "GET",
            headers: {'Content-type': 'application/json'},
            responseType: 'arraybuffer'
        }).success(function (data) {
            var blob = new Blob([data], {type: "image/jpeg"});
            var objectUrl = URL.createObjectURL(blob);
						deferred.resolve(objectUrl);
        }).error(function (status) {
            $log.error(status);
        });
				return deferred.promise;
			}
		}
})();
