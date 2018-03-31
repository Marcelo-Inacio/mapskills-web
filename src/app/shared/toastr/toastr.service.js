(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('toastrService', toastrService);

		/** @ngInject */
		function toastrService(toastr) {

			var httpMessages = {
				200: function() { toastr.success('Salvo com sucesso.', 'Feito!'); },
				400: function() { toastr.error('Verifique as informações de envio.', 'Falha!'); },
				401: function() { toastr.error('Parece que você não tem autorização.', 'Ops!'); },
				403: function() { toastr.error('Acesso Proibido.', 'Ops!'); },
				500: function() { toastr.error('Parece que houve um problema no servidor.', 'Falha!'); }
			}

			return {
        showToastr : _showToastr
			};

      function _showToastr(status) {
        httpMessages[status]();
      }
		}
})();
