'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Listing;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Listing', Listing = function Listing(data) {
        _classCallCheck(this, Listing);

        this._id = '';
        this.title = '';
        this.description = '';
        this.canEdit = false;

        Object.assign(this, data);
      });

      _export('Listing', Listing);
    }
  };
});
//# sourceMappingURL=listing.js.map
