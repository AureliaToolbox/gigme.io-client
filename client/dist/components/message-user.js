'use strict';

System.register(['aurelia-framework', 'aurelia-dialog', 'services/messages', 'models/message'], function (_export, _context) {
  "use strict";

  var bindable, DialogController, MessagesService, Message, _desc, _value, _class, _descriptor, _descriptor2, _class2, _temp, MessageUser;

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
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }, function (_aureliaDialog) {
      DialogController = _aureliaDialog.DialogController;
    }, function (_servicesMessages) {
      MessagesService = _servicesMessages.MessagesService;
    }, function (_modelsMessage) {
      Message = _modelsMessage.Message;
    }],
    execute: function () {
      _export('MessageUser', MessageUser = (_class = (_temp = _class2 = function () {
        function MessageUser(dialogController, messagesService) {
          _classCallCheck(this, MessageUser);

          _initDefineProp(this, 'user', _descriptor, this);

          _initDefineProp(this, 'message', _descriptor2, this);

          this.controller = dialogController;
          this.messagesService = messagesService;
          this.message.body = "Hi, I'd like to contact you about an opportunity for my company.  I am not a recruiter";
        }

        MessageUser.prototype.activate = function activate(user) {
          this.user = user;
          this.message.to_user_id = this.user.id;
        };

        MessageUser.prototype.sendMessage = function sendMessage() {
          console.log(this.message);
          this.messagesService.sendMessage(this.user, this.message).then(function (result) {
            console.log(result);
          });
          this.controller.ok(this.user);
        };

        return MessageUser;
      }(), _class2.inject = [DialogController, MessagesService], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'user', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'message', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return new Message();
        }
      })), _class));

      _export('MessageUser', MessageUser);
    }
  };
});
//# sourceMappingURL=message-user.js.map
