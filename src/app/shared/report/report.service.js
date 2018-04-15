(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('reportService', reportService);

		/** @ngInject */
		function reportService($http, $q, $log, HelperService, downloadService, API_SERVER) {
			var studentsPageCached = {students: [], remainingPages: 0};

			return {
				search : _search,
        download : _download
			};

      function _search(filter, clearCache, page) {
        var deferred = $q.defer();
				if (clearCache) {
					studentsPageCached.students = [];
					studentsPageCached.remainingPages = 0;
				}
				if (page.isLast) {
					deferred.resolve(studentsPageCached);
				} else {
					var uri = API_SERVER.REPORT.SHOW;
					$http.get(uri, {params: filter}).then(function success(response) {
						studentsPageCached.students = studentsPageCached.students.concat(response.data.students);
						studentsPageCached.remainingPages = response.data.remainingPages;
						deferred.resolve(studentsPageCached);
					}, function error(response) {
						$log.error(response);
						deferred.reject(response);
					});
				}

        return deferred.promise;
      }

      function _download(filter) {
        downloadService.download(filter);
      }

		}
})();
