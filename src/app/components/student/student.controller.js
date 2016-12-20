(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('StudentController', StudentController);

	/** @ngInject */
	function StudentController(StudentService, LoginService) {
    	var vm = this;

    	var student = {"id":42, "fullname":"alcantra"};
    	vm.history = [];
    	vm.answer = {};

    	(function() {
    		//vm.student = StorageHelper.getItem('user');
    	})();
			vm.scene = "../../../assets/images/scene1.jpg";

    	vm.sendAnswer = function(questionId, alternative, skillId) {
				alert(student.id +" "+questionId+" "+alternative.id+" "+alternative.skillValue+" "+skillId);
    		//StudentService.sendAnswer()
				//envia e troca de cena
    	}

    	vm.playhover = function () {
    		var hover = document.getElementById("over");
    		console.log('sobre');
    		hover.currentTime = 0;
    		hover.play();
    	}

    	vm.infoout = function () {
    		console.log('fora');
    		var opic = document.getElementById("infobox");
    		opic.className="infoclose";
    	}

    	/*vm.openOptions = function () {
    		resposta = resposta + 1;
    		if (resposta == 2){

    			resposta=0;
    		} else {
    			document.getElementById("op1").innerHTML=opçoes[perguntaatual][0].Resposta;
    			document.getElementById("op2").innerHTML=opçoes[perguntaatual][1].Resposta;
    			document.getElementById("op3").innerHTML=opçoes[perguntaatual][2].Resposta;
    			document.getElementById("op4").innerHTML=opçoes[perguntaatual][3].Resposta;
    			document.getElementById("options").className="optionopen";
    			document.getElementById("prosseguir").className="inactive";
    			perguntaatual++;
    		}
    		var tela = document.getElementById("tela");
    		tela.className = "scene" + i;
    		i = i + 1;


    		advancetext();
    	}*/

  		vm.history = [
  		          	{
  		        		"index" : 1,
  		        		"text" : "cena numero um",
  		        		"background" : "http://site.com/img/img0001",
  		        		"question" : null,
  		        	},
  		        	{
  		        		"index" : 2,
  		        		"text" : "cena numero dois",
  		        		"background" : "http://site.com/img/img0002",
  		        		"question" : {
  		        			"id" : 1,
  		        			"skillId" : 1,
										"description":"eai qualé ?",
  		        			"alternatives": [
  		        				  {"id" : 4, "description" : "alternativa A", "skillValue" : 10},
  		        				  {"id" : 4, "description" : "alternativa B", "skillValue" : 9},
  		        				  {"id" : 4, "description" : "alternativa C", "skillValue" : 5},
  		        				  {"id" : 4, "description" : "alternativa D", "skillValue" : 12}
  		        			]
  		        		}
  		        	}
  		        ];
	}

})();
