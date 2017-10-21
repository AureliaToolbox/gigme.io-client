'use strict';

System.register(['./link'], function (_export, _context) {
  "use strict";

  var Link, User;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_link) {
      Link = _link.Link;
    }],
    execute: function () {
      _export('User', User = function () {
        function User(data) {
          _classCallCheck(this, User);

          this.id = '';
          this.name = '';
          this.image = '';
          this.username = '';
          this.links = [];

          var tempLinks = [];
          if (data.links) {
            data.links.forEach(function (link) {
              var newLink = new Link(link);
              tempLinks.push(newLink);
            });
            data.links = tempLinks;
          }
          Object.assign(this, data);
          if (this._id) {
            this.id = this.getId();
          }
        }

        User.prototype.getId = function getId() {
          return this._id.$oid;
        };

        User.prototype.addLink = function addLink(link) {
          this.links.push(link);
        };

        return User;
      }());

      _export('User', User);
    }
  };
});
//# sourceMappingURL=user.js.map
