(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('adminService', ['$http', '$q', adminService]);

		/** @ngInject */
		function adminService($http, $q) {
			return {
				loadAllSkills : _loadAllSkills
			};

			function _loadAllSkills() {
				var deferred = $q.defer();
				return $http.get('./app/components/admin/skills.json').success(function(response) {
					deferred.resolve(response);
				});
				return deferred.promise;
			}
		}
})();
