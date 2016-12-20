(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
