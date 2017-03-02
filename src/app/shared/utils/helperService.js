(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.service('HelperService', HelperService);

		/** @ngInject */
		function HelperService() {
			this.getFullRestApi = function(uri) {
        return "http://localhost:8585/mapskills".concat(uri);
      }
		}
})();
