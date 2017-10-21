'use strict';

System.register(['models/message', 'aurelia-framework', 'services/messages', 'services/session', 'resources/datastore'], function (_export, _context) {
  "use strict";

  var Message, bindable, MessagesService, Session, Datastore, _desc, _value, _class, _descriptor, _descriptor2, _class2, _temp, Index;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_modelsMessage) {
      Message = _modelsMessage.Message;
    }, function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }, function (_servicesMessages) {
      MessagesService = _servicesMessages.MessagesService;
    }, function (_servicesSession) {
      Session = _servicesSession.Session;
    }, function (_resourcesDatastore) {
      Datastore = _resourcesDatastore.Datastore;
    }],
    execute: function () {
      _export('Index', Index = (_class = (_temp = _class2 = function () {
        function Index(messagesService, session, datastore) {
          _classCallCheck(this, Index);

          _initDefineProp(this, 'fromMessages', _descriptor, this);

          _initDefineProp(this, 'toMessages', _descriptor2, this);

          this.messagesService = messagesService;
          this.session = session;
          this.datastore = datastore;
        }

        Index.prototype.attached = function attached() {
          var _this = this;

          var user = this.session.currentUser;
          if (user) {
            var fromPromise = this.messagesService.getFromMessages(user).then(function (messages) {
              _this.fromMessages = messages;
            });
            var toPromise = this.messagesService.getToMessages(user).then(function (messages) {
              _this.toMessages = messages;
            });
            return Promise.all([toPromise, fromPromise]);
          }
        };

        return Index;
      }(), _class2.inject = [MessagesService, Session, Datastore], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'fromMessages', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'toMessages', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class));

      _export('Index', Index);
    }
  };
});
//# sourceMappingURL=index.js.map
