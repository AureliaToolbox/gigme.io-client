'use strict';

System.register(['aurelia-framework', 'services/links'], function (_export, _context) {
  "use strict";

  var bindable, LinksService, _desc, _value, _class, _descriptor, _class2, _temp, LinkItem;

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
    }, function (_servicesLinks) {
      LinksService = _servicesLinks.LinksService;
    }],
    execute: function () {
      _export('LinkItem', LinkItem = (_class = (_temp = _class2 = function () {
        function LinkItem(linksService) {
          _classCallCheck(this, LinkItem);

          _initDefineProp(this, 'link', _descriptor, this);

          this.isEditing = false;

          this.linksService = linksService;
        }

        LinkItem.prototype.attached = function attached() {
          if (this.link.isNew) {
            this.isEditing = true;
          }
        };

        LinkItem.prototype.edit = function edit() {
          this.isEditing = true;
        };

        LinkItem.prototype.save = function save() {
          var _this = this;

          this.linksService.save(this.link).then(function (result) {
            _this.isEditing = false;
          });
        };

        return LinkItem;
      }(), _class2.inject = [LinksService], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'link', [bindable], {
        enumerable: true,
        initializer: null
      })), _class));

      _export('LinkItem', LinkItem);
    }
  };
});
//# sourceMappingURL=link-item.js.map
