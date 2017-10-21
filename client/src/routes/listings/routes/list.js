import {CompaniesService} from 'services/companies';
import {ListingsService} from 'services/listings';
import {Listing, Company, ListingType} from 'models/index';
import {Datastore} from 'resources/datastore';
import {Session} from 'services/session'
import {observable, bindable} from 'aurelia-framework';
import {WalletsService} from 'services/wallets';
import {DialogService} from 'aurelia-dialog';
import {SendMoney} from 'components/send-money';
import {RequestPayment} from 'components/request-payment';

export class List {
  @bindable listings = [];

  static inject = [ListingsService, Datastore, Session];
  constructor(listingsService, datastore, session) {
    this.listingsService = listingsService;
    this.datastore = datastore;
    this.session = session;
  }
  activate() {
    // TODO: Pull from loaded page
    return this.loadListings();
  }
  loadListings() {
    if (!this.listings.length) {
      return this.listingsService.getListings().then(result => {
        result.forEach(listing => {
          let user = this.session.currentUser;
          if (user && user.company) {
            // TODO: Figure something out that works here
            listing.canEdit = false;
            // listing.canEdit = (user.company.id === listing.company.id);
          }
          this.datastore.addListing(listing);
          this.listings.push(listing);
        });
      });
    }
  }
}
