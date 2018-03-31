(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(/*$timeout, toastr, $translate, $location*/) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1480699708377;
/*    vm.showToastr = showToastr;

    activate();

    function init() {
      var path = $location.path(), normalized = path.toLowerCase();
      storageService.setItem('page', path);
    }

    vm.getPath = function() {
      return storageService.getItem('page');
    }

    function activate() {
      $timeout(function() {
        toastr.info('Idioma alterado para <b>PORTUGUÊS</b> .');
        vm.classAnimation = 'rubberBand';
        $translate.refresh();
        $translate.use('pt');
      }, 6000);
    }

    function showToastr() {
      toastr.warning('Warning message sample!')
      toastr.success('Success message sample!')
      toastr.error('Error messa sample.', 'Exception!')
      // toastr.remove()
      toastr.info('Demo <a href="http://codeseven.github.io/toastr/demo.html" target="_blank"><b>TOASTR</b></a> .');
      vm.classAnimation = 'jello';
    }
    */
  }
})();
