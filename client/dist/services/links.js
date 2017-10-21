'use strict';

System.register(['services/session', 'models/index', 'aurelia-http-client'], function (_export, _context) {
  "use strict";

  var Session, Link, HttpClient, _class, _temp, LinksService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_servicesSession) {
      Session = _servicesSession.Session;
    }, function (_modelsIndex) {
      Link = _modelsIndex.Link;
    }, function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }],
    execute: function () {
      _export('LinksService', LinksService = (_temp = _class = function () {
        function LinksService(session, httpClient) {
          _classCallCheck(this, LinksService);

          this.session = session;
          this.http = httpClient.configure(function (x) {
            x.withHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').content);
          });;
        }

        LinksService.prototype.save = function save(link) {
          console.log(link);
          var url = '';
          var verb = void 0;
          if (link.isNew) {
            url += 'links.json';
            verb = 'post';
          } else {
            url += 'links/' + link.id + '.json';
            verb = 'put';
          }
          return this.http[verb](url, link).then(function (result) {
            console.log('Saved');
          });
        };

        return LinksService;
      }(), _class.inject = [Session, HttpClient], _temp));

      _export('LinksService', LinksService);
    }
  };
});
//# sourceMappingURL=links.js.map
