(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('storageService', storageService);

		/** @ngInject */
		function storageService() {
			return {
				setItem : _set,
				getItem : _get,
				removeItem : _remove,
				removeAll : _clearAll,
				getPath : _getDefaultUrlPath,
				getToken : _getToken
			};

			function _set(key, value) {
				localStorage.setItem(key, angular.toJson(value));
			}

			function _get(key) {
				return angular.fromJson(localStorage.getItem(key));
			}

			function _remove(key) {
				localStorage.removeItem(key);
			}

			function _clearAll() {
				localStorage.clear();
			}

			function _getToken() {
				return _get('Authorization');
			}

			function _getDefaultUrlPath() {
				return "http://localhost:8080/mapskills";
			}

		}
})();
