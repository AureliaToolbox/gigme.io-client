'use strict';

System.register(['aurelia-http-client', 'models/listing-type'], function (_export, _context) {
  "use strict";

  var HttpClient, ListingType, _class, _temp, ListingsService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function getId(object) {
    return object._id.$oid;
  }
  return {
    setters: [function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_modelsListingType) {
      ListingType = _modelsListingType.ListingType;
    }],
    execute: function () {
      _export('ListingsService', ListingsService = (_temp = _class = function () {
        function ListingsService(httpClient) {
          _classCallCheck(this, ListingsService);

          this.http = httpClient.configure(function (x) {
            x.withHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').content);
          });
        }

        ListingsService.prototype.getListingTypes = function getListingTypes() {
          return this.http.get('listing_types.json').then(function (result) {
            return result.content;
          });
        };

        ListingsService.prototype.saveListingType = function saveListingType() {
          var listingType = new ListingType();
          listingType.name = 'Full-time';
          return this.http.post('listing_types/create.json', listingType).then(function (result) {
            return result.content;
          });
        };

        ListingsService.prototype.getListings = function getListings() {
          return this.http.get('listings.json').then(function (result) {
            return result.content;
          });
        };

        ListingsService.prototype.save = function save(job) {
          delete job.isEditing;
          job.company_id = getId(job.company);
          job.listing_type_id = getId(job.listing_type);
          return this.http.post('listings/create.json', job).then(function (result) {
            return result.content;
          });
        };

        return ListingsService;
      }(), _class.inject = [HttpClient], _temp));

      _export('ListingsService', ListingsService);
    }
  };
});
//# sourceMappingURL=listings.js.map
