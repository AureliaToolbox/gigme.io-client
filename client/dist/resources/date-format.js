'use strict';

System.register(['moment'], function (_export, _context) {
  "use strict";

  var moment, DateFormatValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }],
    execute: function () {
      _export('DateFormatValueConverter', DateFormatValueConverter = function () {
        function DateFormatValueConverter() {
          _classCallCheck(this, DateFormatValueConverter);
        }

        DateFormatValueConverter.prototype.toView = function toView(value) {
          return moment(value).format('M/D/YYYY h:mm:ss a');
        };

        return DateFormatValueConverter;
      }());

      _export('DateFormatValueConverter', DateFormatValueConverter);
    }
  };
});
//# sourceMappingURL=date-format.js.map
