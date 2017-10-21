import {bindable} from 'aurelia-framework';
import {Datastore} from 'resources/datastore';
import {ListingsService} from 'services/listings';
import {WalletsService} from 'services/wallets';
import {DialogService} from 'aurelia-dialog';
import {SendMoney} from 'components/send-money';
import {RequestPayment} from 'components/request-payment';

export class Details {
  @bindable listing;

  static inject = [Datastore, ListingsService, DialogService, WalletsService];
  constructor(datastore, listingsService, dialogsService, walletsService) {
    this.datastore = datastore;
    this.listingsService = listingsService;
    this.dialogsService = dialogsService;
    this.walletsService = walletsService;
  }

  activate(params) {
    let listingId = params.id;
    this.listing = this.findListingById(listingId);

    if (!this.listing) {
      return this.listingsService.getListingById(listingId).then(listing => {
        this.listing = listing;
      });
    }
  }

  findListingById(id) {
    let match = this.datastore.listings.filter(listing => {
      return listing.id.toString() === id.toString();
    })[0];
    return match;
  }

  sendMoney() {
    let model = this.listing.address;
    return this.dialogsService.open({ viewModel: SendMoney, model: model }).then(dialogResult => {
      return this.getAddress(this.listing).then(result => {
        this.listing.isEditing = false;
      });
    });
  }

  requestPayment() {
    let model = this.listing;

    return this.dialogsService.open({ viewModel: RequestPayment, model: model }).then(dialogResult => {
    });
  }

  doing() {
    alert('Implement workflow for saying you are working on a listing.');
  }

  getAddress() {
    return this.walletsService.getAddress(this.listing.address).then(result => {
      if (!result || !result.total_value) {
        this.hasNoWallet = true;
      }
      this.listing.address.total_value = result.total_value;
      this.hasNoWallet = false;
    });
  }
}
