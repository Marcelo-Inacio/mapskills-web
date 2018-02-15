(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('HelperService', HelperService);

		/** @ngInject */
		function HelperService() {
			return {
				isUndefinedOrNull: _isUndefinedOrNull,
				getSemester: _getSemester,
				getFullYear: _getFullYear
			};

			function _isUndefinedOrNull(arg) {
				return angular.isUndefined(arg) || arg == null || arg === "";
			}

			function _getSemester(date) {
				if (_isUndefinedOrNull(date)) {
					return _getSemester(new Date());
				}
				return date.getMonth() <= 5 ? 1 : 2;
			}

			function _getFullYear(date) {
				if (_isUndefinedOrNull(date)) {
					return _getFullYear(new Date());
				}
				return date.getFullYear();
			}
		}
})();
