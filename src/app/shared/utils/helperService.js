(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.service('HelperService', HelperService);

		/** @ngInject */
		function HelperService() {
			this.getFullRestApi = function(uri) {
        return "http://127.0.0.1:8585/mapskills/".concat(uri);
      }
		}
})();
