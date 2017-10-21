'use strict';

System.register(['aurelia-http-client'], function (_export, _context) {
  "use strict";

  var HttpClient, _class, _temp, MessagesService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }],
    execute: function () {
      _export('MessagesService', MessagesService = (_temp = _class = function () {
        function MessagesService(http) {
          _classCallCheck(this, MessagesService);

          this.http = http;
        }

        MessagesService.prototype.sendMessage = function sendMessage(user, message) {
          var url = '/admin/users/' + user.id + '/messages.json';
          var body = { message: message };
          return this.http.post(url, body).then(function (result) {
            return result.content;
          });
        };

        MessagesService.prototype.getFromMessages = function getFromMessages(user) {
          var url = '/admin/users/' + user.id + '/messages/from.json';
          return this.http.get(url).then(function (result) {
            return result.content;
          });
        };

        MessagesService.prototype.getToMessages = function getToMessages(user) {
          var url = '/admin/users/' + user.id + '/messages/to.json';
          return this.http.get(url).then(function (result) {
            return result.content;
          });
        };

        return MessagesService;
      }(), _class.inject = [HttpClient], _temp));

      _export('MessagesService', MessagesService);
    }
  };
});
//# sourceMappingURL=messages.js.map
