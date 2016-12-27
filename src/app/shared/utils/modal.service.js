(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('modalService', modalService);

		/** @ngInject */
		function modalService($uibModal) {
			return {
				openModal : _openModal,
        setResult : _setResult,
        getResult : _getResult
			};

      var tmpResult;

      function _openModal(modalTemplate, params) {
        return $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: modalTemplate,
          controller: 'ModalController',
          controllerAs: 'modalCtrl',
          resolve: {
            params: function() {
              return params;
            }
          }
        });
      }

      function _setResult(result) {
        tmpResult = result;
      }

      function _getResult() {
        return tmpResult;
      }

		}
})();
