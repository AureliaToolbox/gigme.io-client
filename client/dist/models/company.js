'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Company;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Company', Company = function Company(data) {
        _classCallCheck(this, Company);

        this._id = '';
        this.name = '';
        this.website = '';
        this.main_contact_id = '';

        Object.assign(this, data);
      });

      _export('Company', Company);
    }
  };
});
//# sourceMappingURL=company.js.map
