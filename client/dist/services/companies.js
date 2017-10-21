'use strict';

System.register(['aurelia-http-client', 'models/company'], function (_export, _context) {
  "use strict";

  var HttpClient, Company, _class, _temp, CompaniesService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_modelsCompany) {
      Company = _modelsCompany.Company;
    }],
    execute: function () {
      _export('CompaniesService', CompaniesService = (_temp = _class = function () {
        function CompaniesService(httpClient) {
          _classCallCheck(this, CompaniesService);

          this.http = httpClient.configure(function (x) {
            x.withHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').content);
          });
        }

        CompaniesService.prototype.getCompanies = function getCompanies() {
          return this.http.get('companies.json').then(function (result) {
            return result.content;
          });
        };

        CompaniesService.prototype.saveCompany = function saveCompany() {
          var company = new Company();
          company.name = 'Google';
          company.website = 'http://www.google.com';
          company.main_contact_id = 1;
          return this.http.post('companies/create.json', company).then(function (result) {
            return result.content;
          });
        };

        return CompaniesService;
      }(), _class.inject = [HttpClient], _temp));

      _export('CompaniesService', CompaniesService);
    }
  };
});
//# sourceMappingURL=companies.js.map
