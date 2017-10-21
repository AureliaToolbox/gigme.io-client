import {Company} from 'models/company';
import {CompaniesService} from 'services/companies';
import {UsersService} from 'services/users';
import {WalletsService} from 'services/wallets';
import {bindable} from 'aurelia-framework';

export class CompanyDetails {
  @bindable company;
  @bindable user;
  isAddingCompany = false;

  static inject = [CompaniesService, UsersService, WalletsService];
  constructor(companiesService, usersService, walletsService) {
    this.companiesService = companiesService;
    this.usersService = usersService;
    this.walletsService = walletsService;
  }
  activate(company) {
    this.company = company;
    if (this.company.company) {
      this.company = this.company.company;
    }
  }
  save() {
    return this.companiesService.create(this.company).then(result => {
      Object.assign(this.company, result);
      this.company.id = this.company.getId();
      this.isAddingCompany = false;
      this.user.setCompany(this.company);
      this.usersService.save(this.user);
    });
  }
  cancel() {
    this.isAddingCompany = false;
  }
  requestNewWallet() {
    return this.walletsService.requestNewCompanyWallet();
  }
}
