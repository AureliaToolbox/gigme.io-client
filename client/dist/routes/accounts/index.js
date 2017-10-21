'use strict';

System.register(['services/session', 'services/users', 'models/index', 'resources/datastore'], function (_export, _context) {
  "use strict";

  var Session, UsersService, Link, Datastore, _class, _temp, Index;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_servicesSession) {
      Session = _servicesSession.Session;
    }, function (_servicesUsers) {
      UsersService = _servicesUsers.UsersService;
    }, function (_modelsIndex) {
      Link = _modelsIndex.Link;
    }, function (_resourcesDatastore) {
      Datastore = _resourcesDatastore.Datastore;
    }],
    execute: function () {
      _export('Index', Index = (_temp = _class = function () {
        function Index(session, usersService, datastore) {
          _classCallCheck(this, Index);

          this.isEditing = false;

          this.session = session;
          this.usersService = usersService;
          this.datastore = datastore;
        }

        Index.prototype.edit = function edit() {
          this.isEditing = true;
        };

        Index.prototype.save = function save() {
          var _this = this;

          var user = this.session.currentUser;
          this.usersService.save(user).then(function (result) {
            _this.isEditing = false;
          });
        };

        Index.prototype.addLink = function addLink() {
          var user = this.session.currentUser;
          var link = new Link();
          link.isNew = true;
          link.user_id = user.id;
          user.addLink(link);
        };

        return Index;
      }(), _class.inject = [Session, UsersService, Datastore], _temp));

      _export('Index', Index);
    }
  };
});
//# sourceMappingURL=index.js.map
