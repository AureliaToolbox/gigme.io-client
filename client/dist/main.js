'use strict';

System.register(['./services/navigation'], function (_export, _context) {
  "use strict";

  var NavigationService, navService;
  function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-dialog').globalResources('resources/date-format').globalResources('components/user-dropdown');

    var path = window.location.pathname.substring(1);
    navService.setActive(path);
    path = 'routes/' + path + '/index';
    aurelia.start().then(function () {
      return aurelia.setRoot(path);
    });
  }

  _export('configure', configure);

  return {
    setters: [function (_servicesNavigation) {
      NavigationService = _servicesNavigation.NavigationService;
    }],
    execute: function () {
      navService = new NavigationService();
    }
  };
});
//# sourceMappingURL=main.js.map
