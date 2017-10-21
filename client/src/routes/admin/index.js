import {UsersService} from 'services/users';
import {CompaniesService} from 'services/companies';
import {ListingsService} from 'services/listings';
import {Datastore} from 'resources/datastore';

export class Index {
  users = [];
  listings = [];
  listingTypes = [];
  companies = [];
  static inject = [UsersService, Datastore, ListingsService, CompaniesService];
  constructor(usersService, datastore, listingsService, companiesService) {
    this.usersService = usersService;
    this.datastore = datastore;
    this.listingsService = listingsService;
    this.companiesService = companiesService;
  }
  activate() {
    let userPromise = this.usersService.getAll().then(result => {
      this.users = result;
    });
    let listingPromise = this.listingsService.getListings().then(result => {
      this.listings = result;
    });
    let listingTypePromise = this.listingsService.getListingTypes().then(result => {
      this.listingTypes = result;
    });
    let companiePromise = this.companiesService.getCompanies().then(result => {
      this.companies = result;
    });
    return Promise.all([userPromise, listingPromise]);
  }
}
