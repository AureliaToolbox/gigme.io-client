'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var NavigationService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('NavigationService', NavigationService = function () {
        function NavigationService() {
          _classCallCheck(this, NavigationService);
        }

        NavigationService.prototype.setActive = function setActive(routeName) {
          var link = document.querySelector('#' + routeName);
          if (link) {
            link.classList.add('active');
          }
        };

        return NavigationService;
      }());

      _export('NavigationService', NavigationService);
    }
  };
});
//# sourceMappingURL=navigation.js.map
