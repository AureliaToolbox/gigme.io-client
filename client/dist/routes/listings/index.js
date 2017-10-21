'use strict';

System.register(['services/companies', 'services/listings', 'models/index', 'resources/datastore', 'services/session', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var CompaniesService, ListingsService, Listing, Company, ListingType, Datastore, Session, observable, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp, Index;

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
    setters: [function (_servicesCompanies) {
      CompaniesService = _servicesCompanies.CompaniesService;
    }, function (_servicesListings) {
      ListingsService = _servicesListings.ListingsService;
    }, function (_modelsIndex) {
      Listing = _modelsIndex.Listing;
      Company = _modelsIndex.Company;
      ListingType = _modelsIndex.ListingType;
    }, function (_resourcesDatastore) {
      Datastore = _resourcesDatastore.Datastore;
    }, function (_servicesSession) {
      Session = _servicesSession.Session;
    }, function (_aureliaFramework) {
      observable = _aureliaFramework.observable;
    }],
    execute: function () {
      _export('Index', Index = (_class = (_temp = _class2 = function () {
        function Index(companiesService, listingsService, datastore, session) {
          _classCallCheck(this, Index);

          this.listings = [];
          this.companies = [];
          this.listingTypes = [];
          this.displayListings = [];

          _initDefineProp(this, 'titleFilter', _descriptor, this);

          _initDefineProp(this, 'descriptionFilter', _descriptor2, this);

          _initDefineProp(this, 'companyFilter', _descriptor3, this);

          _initDefineProp(this, 'typeFilter', _descriptor4, this);

          this.companiesService = companiesService;
          this.listingsService = listingsService;
          this.datastore = datastore;
          this.session = session;
        }

        Index.prototype.attached = function attached() {
          var _this = this;

          return Promise.all([this.loadListingTypes(), this.loadCompanies()]).then(function () {
            _this.loadListings();
          });
        };

        Index.prototype.loadListings = function loadListings() {
          var _this2 = this;

          if (!this.listings.length) {
            return this.listingsService.getListings().then(function (result) {
              result.forEach(function (listingJson) {
                var listing = new Listing(listingJson);
                var user = _this2.session.currentUser;
                if (user && user.company) {
                  listing.canEdit = user.company._id === listing._id;
                }
                _this2.datastore.addListing(listing);
                _this2.listings.push(listing);
              });
              _this2.filter();
            });
          }
        };

        Index.prototype.loadCompanies = function loadCompanies() {
          var _this3 = this;

          if (!this.companies.length) {
            return this.companiesService.getCompanies().then(function (result) {
              result.forEach(function (companyJson) {
                var company = new Company(companyJson);
                _this3.datastore.companies.push(company);
                _this3.companies.push(company);
              });
            });
          }
        };

        Index.prototype.loadListingTypes = function loadListingTypes() {
          var _this4 = this;

          if (!this.listingTypes.length) {
            this.listingsService.getListingTypes().then(function (result) {
              result.forEach(function (listingTypeJson) {
                var listingType = new ListingType(listingTypeJson);
                _this4.datastore.listingTypes.push(listingType);
                _this4.listingTypes.push(listingType);
              });
            });
          }
        };

        Index.prototype.edit = function edit(item) {
          item.isEditing = true;
        };

        Index.prototype.save = function save(item) {
          this.listingsService.save(item).then(function (result) {
            console.log('Saved');
          });
        };

        Index.prototype.add = function add() {
          var newListing = new Listing();
          newListing.isEditing = true;
          this.listings.push(newListing);
        };

        Index.prototype.titleFilterChanged = function titleFilterChanged() {
          this.filter();
        };

        Index.prototype.descriptionFilterChanged = function descriptionFilterChanged() {
          this.filter();
        };

        Index.prototype.companyFilterChanged = function companyFilterChanged() {
          this.filter();
        };

        Index.prototype.typeFilterChanged = function typeFilterChanged() {
          this.filter();
        };

        Index.prototype.filter = function filter() {
          var _this5 = this;

          this.displayListings = this.listings.filter(function (listing) {
            var match = true;
            if (_this5.titleFilter) {
              if (listing.title.toLowerCase().indexOf(_this5.titleFilter.toLowerCase()) === -1) {
                match = false;
              }
            }
            if (match && _this5.descriptionFilter) {
              if (listing.description.toLowerCase().indexOf(_this5.descriptionFilter.toLowerCase()) === -1) {
                match = false;
              }
            }
            if (match && _this5.companyFilter) {
              if (!listing.company || listing.company.name.toLowerCase().indexOf(_this5.companyFilter.toLowerCase()) === -1) {
                match = false;
              }
            }
            if (match && _this5.typeFilter) {
              if (!listing.listing_type || listing.listing_type.name.toLowerCase().indexOf(_this5.typeFilter.toLowerCase()) === -1) {
                match = false;
              }
            }
            return match;
          });
        };

        return Index;
      }(), _class2.inject = [CompaniesService, ListingsService, Datastore, Session], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'titleFilter', [observable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'descriptionFilter', [observable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'companyFilter', [observable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'typeFilter', [observable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class));

      _export('Index', Index);
    }
  };
});
//# sourceMappingURL=index.js.map
