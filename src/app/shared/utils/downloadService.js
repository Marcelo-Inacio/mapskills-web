(function() {
	'use strict';

  angular
		.module('mapskillsWeb')
		.factory('downloadService', ['$http', 'HelperService', downloadService]);

		/** @ngInject */
		function downloadService($http, HelperService) {
      return {
				template : _template,
				image : _image,
				download : _download
			};

      function _template(fileName) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        $http({
            url: "assets/templates/".concat(fileName), method: "GET",
            headers: {'Content-type': 'application/json'},
            responseType: 'arraybuffer'
        }).success(function (data, status, headers, config) {
            var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(objectUrl);
        }).error(function (data, status, headers, config) {
            //upload failed
        });
      }

			function _download(filter) {
				console.log(filter);
				var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        $http({
            url: HelperService.getFullRestApi('/report/download'), method: "POST",
            headers: {'Content-type': 'application/json'},
						data: angular.toJson(filter), responseType: 'arraybuffer'
        }).success(function (data, status, headers, config) {
            var blob = new Blob([data], {type: "text/csv"});
            var objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = "report.csv";
            a.click();
            window.URL.revokeObjectURL(objectUrl);
        }).error(function (data, status, headers, config) {
            //upload failed
        });
			}

			function _image(sceneNumber) {
				var deferred = $q.defer();
        $http({
            url: "http://localhost:8585/image/".concat(sceneNumber), method: "GET",
            headers: {'Content-type': 'application/json'},
            responseType: 'arraybuffer'
        }).success(function (data, status, headers, config) {
            var blob = new Blob([data], {type: "image/jpeg"});
            var objectUrl = URL.createObjectURL(blob);
						deferred.resolve(objectUrl);
        }).error(function (data, status, headers, config) {
            //upload failed
        });
				return deferred.promise;
			}
		}
})();
