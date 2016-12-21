(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StudentController', StudentController);

	/** @ngInject */
	function StudentController($document, $log, StudentService, LoginService) {
		var vm = this;
		/** aluno logado na aplicação */
		var student = {"id":42, "fullname":"alcantra"};
		var sizeScene;
		vm.history;
		vm.answer = {};
		vm.index = 0;

		vm.active = "active";

		/** função principal que recupera todas cenas ainda não jogadas pelo aluno */
		(function() {
			//vm.student = StorageHelper.getItem('user');
			/** params: aluno */
			StudentService.getHistory().then(function(response) {
				$log.log(response);
				vm.history = response.data;
				vm.myStyle = {'background-image' : "url("+vm.history[vm.index].background+")"};
				sizeScene = vm.history.length;
			});
		})();

		/** função que envia um resposta do aluno ao back-end */
		vm.sendAnswer = function(questionId, alternative, skillId) {
			$log.info(student.id +" "+questionId+" "+alternative.id+" "+alternative.skillValue+" "+skillId);
			//StudentService.sendAnswer()
			vm.nextScene();
		}
		/** função que realiza a mudança de cena na tela */
		vm.nextScene = function() {
			$log.log(vm.index);
			/** chega ao fim das cenas, deve levar aos resultados */
			if(sizeScene <= vm.index + 1) return;
			vm.index = vm.index + 1;
			vm.myStyle = {'background-image' : "url("+vm.history[vm.index].background+")"};
			if(vm.history[vm.index].question != null) {
				vm.active = "inactive";
			}
		}
		/** funcção que ativa o som do mouse hover */
		vm.playhover = function () {
			var hover = document.getElementById("over");
			hover.currentTime = 0;
			hover.play();
		}

		vm.infoout = function () {
			$log.info('fora');
			var opic = document.getElementById("infobox");
			opic.className="infoclose";
		}

	}

})();
