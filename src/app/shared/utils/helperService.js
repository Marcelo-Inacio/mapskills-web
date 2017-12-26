(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('HelperService', HelperService);

		/** @ngInject */
		function HelperService() {
			return {
				isUndefinedOrNull: _isUndefinedOrNull
			};

			function _isUndefinedOrNull(arg) {
				return angular.isUndefined(arg) || arg === null;
			}
		}
})();
