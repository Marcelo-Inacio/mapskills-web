(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .directive('filePost', filePost);

  /** @ngInject */
  function filePost() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/shared/navbar/navbar.html',
      scope: {
          fileName: '='
      },
      controller: FilePostController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FilePostController($log, storageService) {
      var vm = this;
      vm.fileInput;

      vm.fileInput = function(file) {
        $log.log(file);
      }
    }
  }

})();
