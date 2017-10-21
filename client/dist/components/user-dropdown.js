'use strict';

System.register(['aurelia-framework', 'services/session', 'models/user'], function (_export, _context) {
  "use strict";

  var bindable, containerless, Session, User, _class, _desc, _value, _class2, _descriptor, _class3, _temp, UserDropdown;

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
      containerless = _aureliaFramework.containerless;
    }, function (_servicesSession) {
      Session = _servicesSession.Session;
    }, function (_modelsUser) {
      User = _modelsUser.User;
    }],
    execute: function () {
      _export('UserDropdown', UserDropdown = containerless(_class = (_class2 = (_temp = _class3 = function () {
        function UserDropdown(session) {
          _classCallCheck(this, UserDropdown);

          _initDefineProp(this, 'currentUser', _descriptor, this);

          this.isOpen = false;

          this.session = session;
        }

        UserDropdown.prototype.bind = function bind(bindingContext, overrideContext) {
          this.session.currentUser = new User(this.currentUser);
        };

        UserDropdown.prototype.toggleOpen = function toggleOpen() {
          this.isOpen = !this.isOpen;
        };

        return UserDropdown;
      }(), _class3.inject = [Session], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'currentUser', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class);

      _export('UserDropdown', UserDropdown);
    }
  };
});
//# sourceMappingURL=user-dropdown.js.map
