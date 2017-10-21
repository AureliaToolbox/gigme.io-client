'use strict';

System.register(['aurelia-framework', '../../services/datacontext', '../../services/session'], function (_export, _context) {
  "use strict";

  var inject, bindable, computedFrom, DataContext, Session, _createClass, _dec, _class, _dec2, _desc, _value, _class3, Home, Card;

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function sortByDate(a, b) {
    return a.posted - b.posted;
  }
  function sortByLikes(a, b) {
    return b.likes.length - a.likes.length;
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_servicesDatacontext) {
      DataContext = _servicesDatacontext.DataContext;
    }, function (_servicesSession) {
      Session = _servicesSession.Session;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Home', Home = (_dec = inject(DataContext, Session), _dec(_class = function () {
        function Home(datacontext, session) {
          _classCallCheck(this, Home);

          this.allCards = [];
          this.newCards = [];
          this.votedCards = [];
          this.recentCards = [];

          this.datacontext = datacontext;
          this.session = session;
        }

        Home.prototype.like = function like(card) {
          if (!card.liked) {
            this.datacontext.likeCard(card).then(function (resp) {
              var newLike = JSON.parse(resp.response).like;
              card.likes.push(newLike);
            });
          }
        };

        Home.prototype.activate = function activate() {
          var _this = this;

          var self = this;
          return this.datacontext.getNewsItems().then(function (resp) {
            JSON.parse(resp.response).forEach(function (card) {
              var newCard = new Card(card, _this.session.currentUser);
              self.allCards.push(newCard);
            });
            self.newCards = self.allCards.sort(sortByDate).slice(0, 5);
            self.votedCards = self.allCards.sort(sortByLikes).slice(0, 5);
          });
        };

        return Home;
      }()) || _class));

      _export('Home', Home);

      Card = (_dec2 = computedFrom('likes'), (_class3 = function () {
        function Card(card, user) {
          var _this2 = this;

          _classCallCheck(this, Card);

          this.user = user;
          this._id = card._id;
          this.name = card.name;
          this.author = card.author;
          this.link = card.link;
          this.posted = new Date(card.posted);
          this.news_contents = card.news_contents;
          this.views = card.views;
          this.likes = [];
          if (card.likes) {
            card.likes.forEach(function (like) {
              _this2.likes.push(like);
            });
          }
          this.open = false;
        }

        Card.prototype.toggleOpen = function toggleOpen() {
          this.open = !this.open;
        };

        _createClass(Card, [{
          key: 'liked',
          get: function get() {
            var _this3 = this;

            var matches = this.likes.filter(function (like) {
              return like.user_id === _this3.user.uid;
            });
            return matches.length !== 0;
          }
        }]);

        return Card;
      }(), (_applyDecoratedDescriptor(_class3.prototype, 'liked', [_dec2], Object.getOwnPropertyDescriptor(_class3.prototype, 'liked'), _class3.prototype)), _class3));
    }
  };
});
//# sourceMappingURL=home.js.map
