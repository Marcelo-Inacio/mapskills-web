(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.service('HelperService', HelperService);

		/** @ngInject */
		function HelperService() {
			this.getFullRestApi = function(uri) {
				//return "http://localhost:8585/mapskills".concat(uri);
        return "http://172.16.1.203:8585/mapskills".concat(uri);
      }
		}
})();
