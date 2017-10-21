'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Link;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Link', Link = function () {
        function Link(data) {
          _classCallCheck(this, Link);

          this.id = '';
          this.title = '';
          this.body = '';
          this.user_id = '';
          this.url = '';
          this.isNew = false;

          Object.assign(this, data);
          if (this._id) {
            this.id = this.getId();
          }
        }

        Link.prototype.getId = function getId() {
          return this._id.$oid;
        };

        return Link;
      }());

      _export('Link', Link);
    }
  };
});
//# sourceMappingURL=link.js.map
