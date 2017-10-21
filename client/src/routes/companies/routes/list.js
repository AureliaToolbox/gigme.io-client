import {CompaniesService} from 'services/companies';
import {Company, CompanyType} from 'models/index';
import {Datastore} from 'resources/datastore';
import {Session} from 'services/session'
import {observable, bindable} from 'aurelia-framework';
import {WalletsService} from 'services/wallets';
import {DialogService} from 'aurelia-dialog';
import {SendMoney} from 'components/send-money';
import {RequestPayment} from 'components/request-payment';

export class List {
  companyTypes = [];
  @observable titleFilter = '';
  @observable descriptionFilter = '';
  @observable companyFilter = '';
  @observable typeFilter = '';

  static inject = [CompaniesService, WalletsService, Datastore, Session, DialogService];
  constructor(companiesService, walletsService, datastore, session, dialogsService) {
    this.companiesService = companiesService;
    this.walletsService = walletsService;
    this.dialogsService = dialogsService;
    this.datastore = datastore;
    this.session = session;
  }
  edit(item) {
    item.isEditing = true;
  }
  save(item) {
    return this.companiesService.save(item).then(result => {
      item.isEditing = false;
    });
  }
  sendMoney(company) {
    let model = company.address;
    return this.dialogsService.open({ viewModel: SendMoney, model: model }).then(dialogResult => {
      return this.getAddress(company).then(result => {
        company.isEditing = false;
      });
    });
  }
  requestPayment(company) {
    let model = company;

    return this.dialogsService.open({ viewModel: RequestPayment, model: model }).then(dialogResult => {
    });
  }
  add() {
    let newCompany = new Company();
    newCompany.isEditing = true;

    let usersCompany = this.session.currentUser.company;
    // TODO: Should not set company of company
    newCompany.setCompany(usersCompany);

    this.datastore.companies.push(newCompany);
    this.filter();
  }
  titleFilterChanged() {
    this.filter();
  }
  descriptionFilterChanged() {
    this.filter();
  }
  companyFilterChanged() {
    this.filter();
  }
  typeFilterChanged() {
    this.filter();
  }
  getAddress(company) {
    return this.walletsService.getAddress(company.address).then(result => {
      if (!result || !result.total_value) {
        this.hasNoWallet = true;
      }
      company.address.total_value = result.total_value;
      this.hasNoWallet = false;
    });
  }
}
