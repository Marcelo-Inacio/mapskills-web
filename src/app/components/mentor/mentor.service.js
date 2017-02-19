(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('mentorService', ['$log', '$http', '$q', 'loginService', 'HelperService', mentorService]);

		/** @ngInject */
		function mentorService($log, $http, $q, loginService, HelperService) {
			return {
				loadAllStudents : _loadAllStudents,
				loadAllCourses : _loadAllCourses,
				loadAllThemesActivated : _loadAllThemesActivated,
				loadThemeCurrent : _loadThemeCurrent,
				saveStudent : _saveStudent,
				saveCourse : _saveCourse,
				sendFile : _sendFile,
				updateThemeIdCurrent : _updateThemeIdCurrent,

				getObjectCurrent : _getObjectCurrent,
				setObjectCurrent : _setObjectCurrent
			};

			var allCoursesCached = null;
			var allStudentsCached = null;
			var objectCurrent;

			function getFullRestApi(uri) {
				return HelperService.getFullRestApi("/institution".concat(uri));
			}

			function _getObjectCurrent() {
				return objectCurrent;
			}

			function _setObjectCurrent(object) {
				objectCurrent = object;
			}

			function _loadAllStudents(loadFromServer) {
				var deferred = $q.defer();
				if(allStudentsCached != null && !loadFromServer) {
					deferred.resolve(allStudentsCached);
				} else {
					var institutionCode = loginService.getUserLogged().institutionCode;
					var uri = getFullRestApi("/").concat(institutionCode).concat("/students");
					$http.get(uri).then(function(response) {
						allStudentsCached = response.data;
						deferred.resolve(response.data);
					});
				}
				return deferred.promise;
      }

			function _loadAllCourses(loadFromServer) {
				var deferred = $q.defer();
				if(allCoursesCached != null && !loadFromServer) {
					deferred.resolve(allCoursesCached);
				} else {
					var institutionCode = loginService.getUserLogged().institutionCode;
					var uri = getFullRestApi("/").concat(institutionCode).concat("/courses");
					$log.info(uri);
					$http.get(uri).then(function(response) {
						allCoursesCached = response.data;
						deferred.resolve(response.data);
					});
				}
				return deferred.promise;
      }

			function _loadAllThemesActivated() {
				var deferred = $q.defer();
				var uri = getFullRestApi("/themes");
				$http.get(uri).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			function _loadThemeCurrent(institutionCode) {
				var deferred = $q.defer();
				var uri = getFullRestApi("/").concat(institutionCode).concat("/theme/current");
				$log.log(uri);
				$http.get(uri).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			function _saveStudent(student) {
				$log.log(student);
				var deferred = $q.defer();
				var jsonData = angular.toJson(student);
				var uri = getFullRestApi("/student");
				$log.info(uri);
        $http({
            method: "POST", url: uri,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        })
				.then(function success(response) {
           deferred.resolve(response.status);
         }, function error(response) {
					 deferred.resolve(response.status);
				 })
        return deferred.promise;
			}

			function _saveCourse(course) {
				var deferred = $q.defer();
				var jsonData = angular.toJson(course);
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
				var jsonData = angular.toJson(file);
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

			function _updateThemeIdCurrent(institutionCode, themeId) {
				var deferred = $q.defer();
				var uri = getFullRestApi("/").concat(institutionCode).concat("/theme/").concat(themeId);
				$log.log(uri);
				$http.put(uri).then(function (response) {
           deferred.resolve(response.status);
         });
        return deferred.promise;
			}

		}
})();
