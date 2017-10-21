'use strict';

System.register(['aurelia-http-client', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var HttpClient, inject, _class, _temp, DataContext;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('DataContext', DataContext = (_temp = _class = function () {
        function DataContext(http, datastore) {
          _classCallCheck(this, DataContext);

          this.http = http.configure(function (x) {
            x.withHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').content);
          });
          this.datastore = datastore;
        }

        DataContext.prototype.load = function load() {
          console.log('getting availabilities');
          this.getAvailabilities();
          this.getExperienceLevels();
        };

        DataContext.prototype.getAvailabilities = function getAvailabilities() {
          var _this = this;

          this.http.get('/availabilities.json').then(function (result) {
            result.content.forEach(function (availability) {
              _this.datastore.availabilities.push(availability);
            });
          });
        };

        DataContext.prototype.getExperienceLevels = function getExperienceLevels() {
          var _this2 = this;

          this.http.get('/experience_levels.json').then(function (result) {
            result.content.forEach(function (experienceLevel) {
              _this2.datastore.experienceLevels.push(experienceLevel);
            });
          });
        };

        DataContext.prototype.getNewsItems = function getNewsItems() {
          return client.get('/news_items.json');
        };

        DataContext.prototype.likeCard = function likeCard(card) {
          return client.createRequest('/news_items/like.json').asPost().withHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').content).withHeader('Content-Type', 'application/json').withContent(card).send();
        };

        return DataContext;
      }(), _class.inject = [HttpClient, Datastore], _temp));

      _export('DataContext', DataContext);
    }
  };
});
//# sourceMappingURL=datacontext.js.map
