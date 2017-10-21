import {bindable} from 'aurelia-framework';
import {Datastore} from 'resources/datastore';
import {CompaniesService} from 'services/companies';

export class Details {
  @bindable company;

  static inject = [Datastore, CompaniesService];
  constructor(datastore, companiesService) {
    this.datastore = datastore;
    this.companiesService = companiesService;
  }

  activate(params) {
    let companyId = params.id;
    this.company = this.findCompanyById(companyId);

    if (!this.company) {
      return this.companiesService.getCompanyById(companyId).then(company => {
        this.company = company;
      });
    }
  }

  findCompanyById(id) {
    let match = this.datastore.companies.filter(company => {
      return company.id.toString() === id.toString();
    })[0];
    return match;
  }
}
