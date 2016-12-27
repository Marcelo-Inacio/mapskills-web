(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('storageService', ['localStorageService', storageService]);

		/** @ngInject */
		function storageService(localStorageService) {
			return {
				setItem : _set,
				getItem : _get,
				removeItem : _remove,
				removeAll : _clearAll,
				getPath : _getDefaultUrlPath,
				getToken : _getToken
			};

			function _set(key, value) {
				return localStorageService.set(key, value);
			}

			function _get(key) {
				return localStorageService.get(key);
			}

			function _remove(key) {
				return localStorageService.remove(key);
			}

			function _clearAll() {
				return localStorageService.clearAll();
			}

			function _getToken() {
				return localStorageService.get('Authorization');
			}

			function _getDefaultUrlPath() {
				return "http://localhost:8080/mapskills";
			}

		}
})();
