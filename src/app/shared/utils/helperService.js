(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.service('HelperService', HelperService);

		/** @ngInject */
		function HelperService() {
			this.getFullRestApi = function(uri) {
				return "http://104.41.62.221:8080/mapskills".concat(uri);
        //return "http://172.16.55.2:8585/mapskills".concat(uri);
      }

			this.isUndefinedOrNull = function(arg) {
				return angular.isUndefined(arg) || arg === null;
			}
		}
})();
