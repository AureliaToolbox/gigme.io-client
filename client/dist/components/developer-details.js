'use strict';

System.register(['aurelia-framework', 'aurelia-dialog', 'services/session'], function (_export, _context) {
  "use strict";

  var bindable, DialogController, Session, _desc, _value, _class, _descriptor, _class2, _temp, DeveloperDetails;

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
    }, function (_servicesSession) {
      Session = _servicesSession.Session;
    }],
    execute: function () {
      _export('DeveloperDetails', DeveloperDetails = (_class = (_temp = _class2 = function () {
        function DeveloperDetails(dialogController, session) {
          _classCallCheck(this, DeveloperDetails);

          _initDefineProp(this, 'developer', _descriptor, this);

          this.controller = dialogController;
          this.session = session;
        }

        DeveloperDetails.prototype.activate = function activate(developer) {
          this.developer = developer;
        };

        DeveloperDetails.prototype.sendMessage = function sendMessage() {
          this.controller.ok(this.developer);
        };

        return DeveloperDetails;
      }(), _class2.inject = [DialogController, Session], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'developer', [bindable], {
        enumerable: true,
        initializer: null
      })), _class));

      _export('DeveloperDetails', DeveloperDetails);
    }
  };
});
//# sourceMappingURL=developer-details.js.map
