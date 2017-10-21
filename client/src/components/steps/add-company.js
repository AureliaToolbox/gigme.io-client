import {Company} from 'models/company';
import {CompaniesService} from 'services/companies';
import {UsersService} from 'services/users';

export class AddCompany {
  user;
  isAddingCompany = false;

  static inject = [CompaniesService, UsersService];
  constructor(companiesService, usersService) {
    this.companiesService = companiesService;
    this.usersService = usersService;
  }
  activate(user) {
    this.user = user;
  }
  addCompany() {
    let company = new Company();
    this.user.company = company;
    this.user.company.main_contact_id = this.user.id;
    this.isAddingCompany = true;
  }
  save() {
    return this.companiesService.create(this.user.company).then(result => {
      Object.assign(this.user.company, result);
      this.user.company.id = this.user.company.getId();
      this.isAddingCompany = false;
      this.user.setCompany(this.user.company);
      this.usersService.save(this.user);
    });
  }
  cancel() {
    this.isAddingCompany = false;
  }
}
