(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('mentorService', ['$log', '$http', '$q', mentorService]);

		/** @ngInject */
		function mentorService($log, $http, $q) {
			return {
				loadAllThemesEnabled : _loadAllThemesEnabled,
        loadAllResultsStudentsByCourse : _loadAllResultsStudentsByCourse,

				loadAllStudents : _loadAllStudents,
				loadAllCourses : _loadAllCourses,
				saveStudent : _saveStudent,
				saveCourse : _saveCourse,
				sendFile : _sendFile,

				getObjectCurrent : _getObjectCurrent,
				setObjectCurrent : _setObjectCurrent
			};

			var objectCurrent;

			function _getObjectCurrent() {
				return objectCurrent;
			}

			function _setObjectCurrent(object) {
				objectCurrent = object;
			}

      function _loadAllStudentsByCourse() {
        return $http.get('./app/components/mentor/repository/studentsByCourse.json');
      }

			/** recupera todos os temas ativados */
			function _loadAllThemesEnabled() {
				return $http.get('./app/components/admin/repository/themes.json');
			}

			function _loadAllResultsStudentsByCourse() {
        return $http.get('./app/components/mentor/repository/resultsStudentsByCourse.json');
      }

			function _loadAllStudents() {
        return $http.get('./app/components/mentor/repository/allStudents.json');
      }

			function _loadAllCourses() {
        return $http.get('./app/components/mentor/repository/allCourses.json');
      }

			function _saveStudent(student) {
				$log.log(student);
			}

			function _saveCourse(course) {
				$log.log(course);
			}

			function _sendFile(file) {
				$log.log(file);
			}

		}
})();
