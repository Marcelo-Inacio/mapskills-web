(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StudentController', StudentController);

	/** @ngInject */
	function StudentController($document, $log, StudentService, LoginService) {
		var vm = this;

		var student = {"id":42, "fullname":"alcantra"};
		vm.history = [];
		vm.answer = {};

		(function() {
			//vm.student = StorageHelper.getItem('user');
				$log.log(StudentService.getHistory());
		})();

		vm.scene = "/src/assets/images/scene1.jpg";

		vm.sendAnswer = function(questionId, alternative, skillId) {
			$log.info(student.id +" "+questionId+" "+alternative.id+" "+alternative.skillValue+" "+skillId);
			//StudentService.sendAnswer()
			//envia e troca de cena
		}

		vm.playhover = function () {
			var hover = $document.getElementById("over");
			hover.currentTime = 0;
			hover.play();
		}

		vm.infoout = function () {
			$log.info('fora');
			var opic = $document.getElementById("infobox");
			opic.className="infoclose";
		}

	}

})();
