(function() {
	'use strict';

	angular
		.module('mapskillsWeb')
		.factory('mentorService', mentorService);

		/** @ngInject */
		function mentorService($log, $http, $q, loginService, HelperService, API_SERVER) {
			var allCoursesCached = null;
			var studentsPageCached = {students: [], remainingPages: 0};
			var objectCurrent;

			return {
				loadStudents : _loadStudents,
				loadCourseIndicators : _loadCourseIndicators,
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

			function getStudentParams(user, page, search) {
				return {
					params: {
						page: page.nextPage,
						name: search.name,
						ra: search.ra,
						institutionCode: user.institution.code,
						courseCode: search.course.code
					}
				};
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

			function _loadStudents(loadFromServer, search, clearCache, page) {
				var deferred = $q.defer();
				if (clearCache) {
					studentsPageCached.students = [];
					studentsPageCached.remainingPages = 0;
				}
				if (studentsPageCached.students.length != 0 && !loadFromServer || page.isLast) {
					deferred.resolve(studentsPageCached);
				} else {
					var user = loginService.getUserLogged();
					var uri = API_SERVER.INSTITUTION.STUDENTS;
					$http.get(uri, getStudentParams(user, page, search)).then(function(response) {
						studentsPageCached.students = studentsPageCached.students.concat(response.data.content);
						studentsPageCached.remainingPages = response.data.remainingPages;
						deferred.resolve(studentsPageCached);
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
				var uri = API_SERVER.THEME.ALL;
				$http.get(uri, {params:{"onlyActives": true}}).then(function(response) {
					deferred.resolve(response.data);
				});
				return deferred.promise;
			}

			function _saveStudent(student) {
				var deferred = $q.defer();
				var context;
				if (student.id) {
					context = {uri : API_SERVER.STUDENT.PUT.replace("{id}", student.id), method : "PUT"};
				} else {
					context = {uri : API_SERVER.STUDENT.POST, method : "POST"};
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
        $http({
            method: "POST", url: API_SERVER.INSTITUTION.COURSE,
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
				var uri = API_SERVER.STUDENT.UPLOAD;
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
				var uri = API_SERVER.INSTITUTION.UPDATE_THEME.replace("{code}", institutionCode);
				$http.put(uri, null, {params: {themeId: themeId}}).then(function (response) {
           deferred.resolve(response.status);
         });
        return deferred.promise;
			}

			function _loadCourseIndicators(institutionCode) {
				var deferred = $q.defer();
				var uri = API_SERVER.REPORT.COURSE;
				$http.get(uri, {params: {institutionCode: institutionCode}}).then(function (response) {
           deferred.resolve(response.data);
         });
				return deferred.promise;
			}
		}
})();
