import {CompaniesService} from 'services/companies';
import {ListingsService} from 'services/listings';
import {Listing, Company, ListingType} from 'models/index';
import {Session} from 'services/session'
import {Datastore} from 'resources/datastore'
import {observable, bindable} from 'aurelia-framework';
import {WalletsService} from 'services/wallets';
import {DialogService} from 'aurelia-dialog';
import {SendMoney} from 'components/send-money';
import {RequestPayment} from 'components/request-payment';

export class ListingList {
  @bindable listings = [];
  @bindable canApprove = false;
  @bindable canCancel = false;
  @bindable canAdd = false;

  companies = [];
  displayListings = [];
  @observable titleFilter = '';
  @observable descriptionFilter = '';
  @observable companyFilter = '';
  @observable typeFilter = '';

  static inject = [CompaniesService, ListingsService, WalletsService, Session, DialogService, Datastore];
  constructor(companiesService, listingsService, walletsService, session, dialogsService, datastore) {
    this.listingsService = listingsService;
    this.session = session;
    this.companiesService = companiesService;
    this.walletsService = walletsService;
    this.dialogsService = dialogsService;
    this.datastore = datastore;
  }

  attached() {
    this.filter();
  }
  edit(item) {
    item.isEditing = true;
  }
  save(item) {
    return this.listingsService.save(item).then(result => {
      item.isEditing = false;
    });
  }
  sendMoney(listing) {
    let model = listing.address;
    return this.dialogsService.open({ viewModel: SendMoney, model: model }).then(dialogResult => {
      return this.getAddress(listing).then(result => {
        listing.isEditing = false;
      });
    });
  }
  requestPayment(listing) {
    let model = listing;

    return this.dialogsService.open({ viewModel: RequestPayment, model: model }).then(dialogResult => {
    });
  }
  add() {
    let newListing = new Listing();
    newListing.isEditing = true;

    let usersCompany = this.session.currentUser.company;
    newListing.setCompany(usersCompany);

    this.listings.push(newListing);
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
  filter() {
    this.displayListings = this.listings.filter(listing => {
      let match = true;
      if (this.titleFilter) {
        if (listing.title.toLowerCase().indexOf(this.titleFilter.toLowerCase()) === -1) {
          match = false;
        }
      }
      if (match && this.descriptionFilter) {
        if (listing.description.toLowerCase().indexOf(this.descriptionFilter.toLowerCase()) === -1) {
          match = false;
        }
      }
      if (match && this.companyFilter) {
        if (!listing.company || listing.company.name.toLowerCase().indexOf(this.companyFilter.toLowerCase()) === -1) {
          match = false;
        }
      }
      if (match && this.typeFilter) {
        if (!listing.listing_type || listing.listing_type.name.toLowerCase().indexOf(this.typeFilter.toLowerCase()) === -1) {
          match = false;
        }
      }
      return match;
    });
  }
  getAddress(listing) {
    return this.walletsService.getAddress(listing.address).then(result => {
      if (!result || !result.total_value) {
        this.hasNoWallet = true;
      }
      listing.address.total_value = result.total_value;
      this.hasNoWallet = false;
    });
  }
}
