(function() {
	'use strict';

  angular
		.module('mapskillsWeb')
		.factory('downloadService',  downloadService);

		/** @ngInject */
		function downloadService($log, $q, $http, HelperService, toastr, API_SERVER) {
      return {
				template : _template,
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
            url: API_SERVER.REPORT.DOWNLOAD, method: "GET",
            headers: {'Content-type': 'application/json; charset=utf-8'},
						responseType: 'arraybuffer',
						params: {
							institutionLevel: filter.level,
							institutionCode: filter.institutionCode,
							courseCode: filter.courseCode,
							startYear: filter.startYear,
							startSemester: filter.startSemester,
							endYear: filter.endYear,
							endSemester: filter.endSemester,
							page: filter.page,
							size: filter.size
						}
        }).success(function (data) {
            var blob = new Blob([data], {type: "text/csv"});
            var objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = "report.csv";
            a.click();
            window.URL.revokeObjectURL(objectUrl);
        }).error(function (status) {
            $log.error(status);
						toastr.error("Problema ao tentar realizar download do relatório.", ":\\");
        });
			}
		}
})();
