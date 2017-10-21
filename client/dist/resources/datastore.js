'use strict';

System.register(['services/users'], function (_export, _context) {
  "use strict";

  var UsersService, _class, _temp, Datastore;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function getId(object) {
    return object.$oid;
  }
  return {
    setters: [function (_servicesUsers) {
      UsersService = _servicesUsers.UsersService;
    }],
    execute: function () {
      _export('Datastore', Datastore = (_temp = _class = function () {
        function Datastore(usersService) {
          _classCallCheck(this, Datastore);

          this.companies = [];
          this.listingTypes = [];
          this.listings = [];
          this.availabilities = [];
          this.experienceLevels = [];

          this.usersService = usersService;
        }

        Datastore.prototype.load = function load() {
          this.datacontext.load();
        };

        Datastore.prototype.addListing = function addListing(listing) {
          this.setupListing(listing);
          this.listings.push(listing);
        };

        Datastore.prototype.addAvailability = function addAvailability(availability) {
          this.availabilities.push(availability);
        };

        Datastore.prototype.addExperienceLevel = function addExperienceLevel(experienceLevel) {
          this.experienceLevels.push(experienceLevel);
        };

        Datastore.prototype.setupListing = function setupListing(listing) {
          if (listing.company_id) {
            listing.company = this.companies.filter(function (company) {
              return getId(company._id) === getId(listing.company_id);
            })[0];
          }
          if (listing.listing_type_id) {
            listing.listing_type = this.listingTypes.filter(function (listingType) {
              return getId(listingType._id) === getId(listing.listing_type_id);
            })[0];
          }
        };

        return Datastore;
      }(), _class.inject = [UsersService], _temp));

      _export('Datastore', Datastore);
    }
  };
});
//# sourceMappingURL=datastore.js.map
