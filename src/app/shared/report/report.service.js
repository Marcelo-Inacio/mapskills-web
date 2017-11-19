(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('reportService', reportService);

		/** @ngInject */
		function reportService($http, $q, $log, HelperService, downloadService, API_SERVER) {
			return {
				search : _search,
        download : _download
			};

      function _search(filter) {
        var deferred = $q.defer();
        var uri = API_SERVER.REPORT.SHOW
        $http.get(uri, {
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
					}).then(function success(response) {
						deferred.resolve(response.data);
        }, function error(response) {
          $log.error(response);
        });
        return deferred.promise;
      }

      function _download(filter) {
        downloadService.download(filter);
      }

		}
})();
