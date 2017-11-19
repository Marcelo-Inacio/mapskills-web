(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('mentorService', mentorService);

		/** @ngInject */
		function mentorService($log, $http, $q, loginService, HelperService, API_SERVER) {
			var page = {nextPage: 0, size: 20, totalPages: 0, numberCurrentPage: 0, isLast: false};
			var allCoursesCached = null;
			var allStudentsCached = null;
			var objectCurrent;

			return {
				loadAllStudents : _loadAllStudents,
				loadAllCourses : _loadAllCourses,
				loadAllThemesActivated : _loadAllThemesActivated,
				saveStudent : _saveStudent,
				saveCourse : _saveCourse,
				sendFile : _sendFile,
				updateThemeIdCurrent : _updateThemeIdCurrent,
				validateProfile : _validateProfile,

				getObjectCurrent : _getObjectCurrent,
				setObjectCurrent : _setObjectCurrent
			};

			function getFullRestApi(uri) {
				return HelperService.getFullRestApi("/institution".concat(uri));
			}

			function _getObjectCurrent() {
				return objectCurrent;
			}

			function _setObjectCurrent(object) {
				objectCurrent = object;
			}

			function _validateProfile() {
				loginService.validateProfile("MENTOR");
			}

			function _loadAllStudents(loadFromServer) {
				var deferred = $q.defer();
				if (allStudentsCached != null && !loadFromServer) {
					deferred.resolve(allStudentsCached);
				} else {
					var user = loginService.getUserLogged();
					//getFullRestApi("/").concat(institutionCode).concat("/students");
					var uri = API_SERVER.INSTITUTION.STUDENTS.replace("{code}", user.institution.code);
					$http.get(uri, {params: {page: page.nextPage}}).then(function(response) {
						page.nextPage = response.data.numberCurrentPage + 1;
						allStudentsCached = response.data.content;
						deferred.resolve(response.data.content);
					});
				}
				return deferred.promise;
      }

			function _loadAllCourses(loadFromServer) {
				var deferred = $q.defer();
				if(allCoursesCached != null && !loadFromServer) {
					deferred.resolve(allCoursesCached);
				} else {
					var user = loginService.getUserLogged();
					var uri = API_SERVER.INSTITUTION.COURSES.replace("{code}", user.institution.code);
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
				var uri = HelperService.getFullRestApi("/game/themes");
				$http.get(uri, {params:{"onlyActives": true}}).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			function _saveStudent(student) {
				var deferred = $q.defer();
				var context;
				if(student.id) {
					context = {uri : getFullRestApi("/student/"+student.id), method : "PUT"};
				} else {
					context = {uri : getFullRestApi("/student"), method : "POST"};
				}
				$log.info(context);
				var jsonData = angular.toJson(student);
        $http({
            method: context.method, url: context.uri,
            data: jsonData,	headers: {"Content-Type": "application/json"}
        })
				.then(function success(response) {
					deferred.resolve(response);
         }, function error(response) {
					deferred.resolve(response);
				});
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
           deferred.resolve(response);
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
           deferred.resolve(response);
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
