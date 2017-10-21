import {bindable, computedFrom} from 'aurelia-framework';
import {Datastore} from 'resources/datastore';
import {Session} from 'services/session';
import {BusinessAgreementsService} from 'services/business-agreements';
import {ListingsService} from 'services/listings';

export class CompanyDetails {
  @bindable company;
  requestedToAgree = [];
  requestingToAgree = [];

  static inject = [Datastore, BusinessAgreementsService, Session, ListingsService];
  constructor(datastore, businessAgreementsService, session, listingsService) {
    this.datastore = datastore;
    this.businessAgreementsService = businessAgreementsService;
    this.session = session;
    this.listingsService = listingsService;
  }

  @computedFrom('session.currentUser.company')
  get canRequestToDoBusiness() {
    return !this.ownsCompany;
  }

  @computedFrom('session.currentUser.company')
  get ownsCompany() {
    let sameCompany = (this.session.currentUser.company.id === this.company.id);
    return !!sameCompany;
  }

  activate(params) {
    let companyId = params.id;
    this.findCompanyById(companyId);
    return this.loadCompanyInfo();
  }

  loadCompanyInfo() {
    let promises = [];

    promises.push(this.businessAgreementsService.getRequestedToDoBusiness().then(result => {
      this.requestedToAgree = result;
    }));
    promises.push(this.businessAgreementsService.getRequestingToDoBusiness().then(result => {
      this.requestingToAgree = result;
    }));
    promises.push(this.listingsService.getListingsByCompany(this.company).then(result => {
      this.company.listings = result;
    }));

    return Promise.all(promises);
  }

  findCompanyById(id) {
    let match = this.datastore.companies.filter(company => {
      return company.id.toString() === id.toString();
    })[0];
    this.company = match;

    return match;
  }

  requestToDoBusiness() {
    let requestingCompany = this.session.currentUser.company;
    let otherCompany = this.company;

    return this.businessAgreementsService.requestToDoBusiness(requestingCompany, otherCompany).then(result => {
      console.log(result);
    });
  }
}
