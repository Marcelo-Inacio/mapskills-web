(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('HelperService', HelperService);

		/** @ngInject */
		function HelperService() {
			return {
				getFullRestApi : _getFullRestApi,
				isUndefinedOrNull: _isUndefinedOrNull
			};

			function _getFullRestApi(uri) {
				return "http://localhost:8585/mapskills".concat(uri);
        //return "http://191.232.161.50:8080/mapskills".concat(uri);
      }

			function _isUndefinedOrNull(arg) {
				return angular.isUndefined(arg) || arg === null;
			}
		}
})();
