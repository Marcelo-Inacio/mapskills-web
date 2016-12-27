(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .directive('filePost', filePost);

  /** @ngInject */
  function filePost() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/shared/filepost/filepost.html',
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

      vm.sendFile = function(file) {
        $log.log(file);
      }
    }
  }

})();
