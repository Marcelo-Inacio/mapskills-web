(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, moment, $translateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    // toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // Translate config
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/languages/locale-',
        suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    $translateProvider.preferredLanguage('en');
  }

})();
