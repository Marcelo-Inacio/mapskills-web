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

			var allCoursesCached = null;
			var allStudentsCached = null;
			var objectCurrent;

			function getFullRestApi(uri) {
				return "http://localhost:8080/mapskills/rest".concat(uri);
			}

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
				var deferred = $q.defer();
				if(allStudentsCached != null) {
					deferred.resolve(allStudentsCached);
				} else {
					var institutionCode = 146;//storageService.getItem('user').institutionCode;
					var uri = getFullRestApi("/institution/").concat(institutionCode).concat("/students");
					$http.get(uri).then(function(response) {
						allStudentsCached = response.data;
						deferred.resolve(response.data);
					});
				}
				return deferred.promise;
      }

			function _loadAllCourses() {
				var deferred = $q.defer();
				if(allCoursesCached != null) {
					deferred.resolve(allCoursesCached);
				} else {
					var institutionCode = 146;//storageService.getItem('user').institutionCode;
					var uri = getFullRestApi("/institution/").concat(institutionCode).concat("/courses");
					$log.info(uri);
					$http.get(uri).then(function(response) {
						allCoursesCached = response.data;
						deferred.resolve(response.data);
					});
				}
				return deferred.promise;
      }

			function _saveStudent(student) {
				var deferred = $q.defer();
				var jsonData = JSON.stringify(student);
				var uri = getFullRestApi("/student");
				$log.info(uri);
        $http({
            method: "POST", url: uri,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
           deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			function _saveCourse(course) {
				var deferred = $q.defer();
				var jsonData = JSON.stringify(course);
				var uri = getFullRestApi("/course");
        $http({
            method: "POST", url: uri,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
           deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			function _sendFile(file) {
				$log.log(file);
				var deferred = $q.defer();
				var jsonData = JSON.stringify(file);
				var uri = getFullRestApi("/upload/students");
        $http({
            method: "POST", url: uri,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        }).
         then(function (response) {
           deferred.resolve(response.status);
         });
        return deferred.promise;
			}

		}
})();
