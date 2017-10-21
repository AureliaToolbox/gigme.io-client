'use strict';

System.register(['aurelia-framework', 'aurelia-http-client', './services/session'], function (_export, _context) {
  "use strict";

  var inject, bindable, HttpClient, Session, _dec, _class, _desc, _value, _class2, _descriptor, NavBar;

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
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_servicesSession) {
      Session = _servicesSession.Session;
    }],
    execute: function () {
      _export('NavBar', NavBar = (_dec = inject(Session), _dec(_class = (_class2 = function () {
        NavBar.prototype.signOut = function signOut() {
          var client = new HttpClient();
          client.createRequest('/users/sign_out').asDelete().withHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')).send().then(function (resp) {
            window.location.reload();
          });
        };

        function NavBar(session) {
          _classCallCheck(this, NavBar);

          _initDefineProp(this, 'router', _descriptor, this);

          this.session = session;
        }

        return NavBar;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _export('NavBar', NavBar);
    }
  };
});
//# sourceMappingURL=nav-bar.js.map
