'use strict';

System.register(['services/session', 'models/index', 'aurelia-framework', 'aurelia-http-client'], function (_export, _context) {
  "use strict";

  var Session, User, TemplatingEngine, HttpClient, _class, _temp, UsersService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_servicesSession) {
      Session = _servicesSession.Session;
    }, function (_modelsIndex) {
      User = _modelsIndex.User;
    }, function (_aureliaFramework) {
      TemplatingEngine = _aureliaFramework.TemplatingEngine;
    }, function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }],
    execute: function () {
      _export('UsersService', UsersService = (_temp = _class = function () {
        function UsersService(session, templatingEngine, httpClient) {
          _classCallCheck(this, UsersService);

          this.session = session;
          this.http = httpClient.configure(function (x) {
            x.withHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').content);
          });;
          var dropdown = document.querySelector('user-dropdown');
          var otherDeadContent = document.querySelector('user-dropdown + li');
          if (dropdown) {
            templatingEngine.enhance(dropdown);
            otherDeadContent.style.display = 'none';
          }
        }

        UsersService.prototype.getAll = function getAll() {
          var url = '/admin/users.json';
          return this.http.get(url).then(function (result) {
            var users = [];
            result.content.forEach(function (user) {
              users.push(new User(user));
            });
            return users;
          });
        };

        UsersService.prototype.save = function save(user) {
          var url = '/admin/users/' + user.id;
          return this.http.put(url, user).then(function (result) {
            console.log('Saved');
          });
        };

        return UsersService;
      }(), _class.inject = [Session, TemplatingEngine, HttpClient], _temp));

      _export('UsersService', UsersService);
    }
  };
});
//# sourceMappingURL=users.js.map
