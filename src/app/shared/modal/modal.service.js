(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('modalService', modalService);

		/** @ngInject */
		function modalService($uibModal) {
			return {
				openModal : _openModal,
				closeModal : _closeModal,
        setResult : _setResult,
        getResult : _getResult,
				okModal : _okModal
			};

			var modalInstance;
      var tmpContextResult;

      function _openModal(modalTemplate, controller) {
        modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: modalTemplate,
          controller: controller,
          controllerAs: 'modalCtrl'
        });
				return modalInstance;
      }

			function _okModal(object) {
				modalInstance.close(object);
			}

			function _closeModal() {
				modalInstance.dismiss('cancel');
			}

      function _setResult(contextResult) {
        tmpContextResult = contextResult;
      }

      function _getResult() {
        return tmpContextResult;
      }
		}
})();
