(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('GameController', GameController);

	/** @ngInject */
	function GameController($log, $state, studentService, Session) {
		var vm = this;
		var student;
		var sizeScenes;
		vm.history;
		vm.index = 0;
		vm.active = "activated";

		init();
		/** função principal que recupera todas questoes ainda não jogadas pelo aluno */
		function init() {
			studentService.validateProfile();
			student = Session.refreshUserSession();
			getHistoryByStudentId(student.id);
		}

		function getHistoryByStudentId(studentId) {
			studentService.getHistory(studentId).then(function(response) {
				vm.history = response;
				sizeScenes = vm.history.length;
				verifyGameIsActived();
			});
		}

		/** função que envia um resposta do aluno ao back-end */
		vm.sendAnswer = function(alternative) {
			var answerContext = {};
			answerContext.sceneIndex = vm.history[vm.index].index;
			answerContext.sceneId = vm.history[vm.index].id;
			answerContext.studentId = student.id;
			answerContext.skillId = vm.history[vm.index].question.skillId;
			answerContext.skillValue = alternative.skillValue;

			studentService.sendAnswer(answerContext).then(function(status) {
				if(status == 201) {
					vm.nextScene();
				}
			});
		}

		/** função que realiza a mudança de cena na tela */
		vm.nextScene = function() {
			$log.log(vm.index);
			/** caso chege ao fim das cenas, deve levar aos resultados */
			if((vm.index + 1) == sizeScenes) {
				$log.log('fim do jogo, vai pra resultados');
				$state.go('student.result');
				return;
			}
			vm.index = vm.index + 1;
			vm.background = {'background-image' : "url(" + vm.history[vm.index].background.filename + ")"};
			if(vm.history[vm.index].question != null) {
				vm.active = "inactive";
				return;
			}
			vm.active = "active";
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

		var verifyGameIsActived = function () {
			if(student.isCompleted === true) {
				$state.go("^.result");
			} else if (sizeScenes === 0) {
				$state.go("^.noGame");
			} else {
				vm.background = {"background-image" : "url(" + vm.history[vm.index].background.filename +")"};
			}
		}

	}

})();
