'use strict';

System.register(['services/users', 'services/companies', 'services/listings', 'resources/datastore'], function (_export, _context) {
  "use strict";

  var UsersService, CompaniesService, ListingsService, Datastore, _class, _temp, Index;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_servicesUsers) {
      UsersService = _servicesUsers.UsersService;
    }, function (_servicesCompanies) {
      CompaniesService = _servicesCompanies.CompaniesService;
    }, function (_servicesListings) {
      ListingsService = _servicesListings.ListingsService;
    }, function (_resourcesDatastore) {
      Datastore = _resourcesDatastore.Datastore;
    }],
    execute: function () {
      _export('Index', Index = (_temp = _class = function () {
        function Index(usersService, datastore, listingsService, companiesService) {
          _classCallCheck(this, Index);

          this.users = [];
          this.listings = [];
          this.listingTypes = [];
          this.companies = [];

          this.usersService = usersService;
          this.datastore = datastore;
          this.listingsService = listingsService;
          this.companiesService = companiesService;
        }

        Index.prototype.activate = function activate() {
          var _this = this;

          var userPromise = this.usersService.getAll().then(function (result) {
            _this.users = result;
          });
          var listingPromise = this.listingsService.getListings().then(function (result) {
            _this.listings = result;
          });
          var listingTypePromise = this.listingsService.getListingTypes().then(function (result) {
            _this.listingTypes = result;
          });
          var companiePromise = this.companiesService.getCompanies().then(function (result) {
            _this.companies = result;
          });
          return Promise.all([userPromise, listingPromise]);
        };

        return Index;
      }(), _class.inject = [UsersService, Datastore, ListingsService, CompaniesService], _temp));

      _export('Index', Index);
    }
  };
});
//# sourceMappingURL=index.js.map
