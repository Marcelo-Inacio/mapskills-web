(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.controller('MentorStudentController', MentorStudentController);

	/** @ngInject */
	function MentorStudentController($log, toastrService, mentorService, modalService, downloadService, Session, HelperService) {
		var vm = this;
		var page = {nextPage: 0, size: 20, isLast: false};
		vm.students = null;
		vm.filter = {name: null, ra: null, course: {}};
		vm.tableHeader = [{label: "Nome", model: "name", width: {'width': '28%'}},
			{label: "RA", model: "ra", width: {'width': '15%'}},
			{label: "Curso", model: "course", width: {'width': '32%'}},
			{label: "Concluído", model: "completed", width: {'width': '10%'}}
		];

    init();

    function init() {
			mentorService.validateProfile();
			loadCourses();
			loadStudents(true);
    }

		function loadStudents(clearCache) {
			if (clearCache) {
				page.nextPage = 0;
				page.isLast = false;
			}
			mentorService.loadStudents(vm.filter, clearCache, page).then(function(response) {
				page.nextPage++;
				page.isLast = response.remainingPages <= 0;
				vm.students = response.students;
			});
		}

		function loadCourses() {
			mentorService.loadAllCourses().then(function(response) {
				vm.allCourses = response;
			});
		}

    vm.openStudentModal = function(student) {
      modalService.setResult(student);
      var modalInstance = modalService.openModal('app/components/mentor/students/modal/student.modal.html', 'MentorStudentModalController');
			modalInstance.result.then(function () {
				loadStudents(true);
			});
		}

		vm.openDetailsModal = function(student) {
      modalService.setResult(student);
      modalService.openModal('app/components/mentor/students/modal/details.modal.html', 'MentorStudentModalController');
		}

		vm.openFileModal = function() {
			modalService.setResult(downloadTemplate);
      var modalInstance = modalService.openModal('app/shared/modal/file.modal.html', 'FileController');
			modalInstance.result.then(function (file) {
				sendFile(file);
			});
		}

		function downloadTemplate() {
			downloadService.template("student.xlsx");
		}

		function sendFile(file) {
      mentorService.sendFile(file).then(function(response) {
				toastrService.showToastr(response.status);
				loadStudents(true);
				modalService.okModal();
			});
    }

		vm.loadMoreStudents = function() {
			loadStudents(false);
		}

		vm.search = function() {
			page.nextPage = 0;
			page.isLast = false;
			vm.filter.course = HelperService.isUndefinedOrNull(vm.filter.course) ? {} : vm.filter.course;
			loadStudents(true);
		}
	}
})();
