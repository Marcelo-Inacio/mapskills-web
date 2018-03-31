(function() {
  'use strict';

  angular
    .module('mapskillsWeb')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, moment, $translateProvider, $httpProvider, ChartJsProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('HttpInterceptor');

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
    $translateProvider.preferredLanguage('pt');

    ChartJsProvider.setOptions({
      chartColors: ['#4D5360','#DCDCDC', '#00ADF9'],
      responsive: true
    });
  }

})();
