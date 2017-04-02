(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('reportService', reportService);

		/** @ngInject */
		function reportService($http, $q, $log, HelperService, downloadService) {
			return {
				search : _search,
        download : _download
			};

      function _search(filter) {
        var deferred = $q.defer();
        var uri = HelperService.getFullRestApi('/report/view');
        $http.post(uri, filter).then(function success(response) {
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
