'use strict';

System.register(['aurelia-framework', 'aurelia-router', '../../services/session', 'resources/datastore'], function (_export, _context) {
  "use strict";

  var inject, Router, Session, Datastore, _class, _temp, Index, User;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_servicesSession) {
      Session = _servicesSession.Session;
    }, function (_resourcesDatastore) {
      Datastore = _resourcesDatastore.Datastore;
    }],
    execute: function () {
      _export('Index', Index = (_temp = _class = function Index(router, session, datastore) {
        _classCallCheck(this, Index);

        this.router = router;
        this.session = session;
        this.datastore = datastore;
        this.router.configure(function (config) {
          config.title = 'Aurelia';
          config.map([{ route: ['', 'home'], moduleId: './home', nav: true, title: 'Home' }]);
        });
      }, _class.inject = [Router, Session, Datastore], _temp));

      _export('Index', Index);

      User = function User(username, uid, image) {
        _classCallCheck(this, User);

        this.username = username;
        this.uid = uid;
        this.image = image;
      };
    }
  };
});
//# sourceMappingURL=index.js.map
