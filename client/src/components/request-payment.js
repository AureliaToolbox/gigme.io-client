import {bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {WalletsService} from 'services/wallets';
import {NetworkFeesService} from 'services/network-fees';
import {ExchangeRatesService} from 'services/exchange-rates';
import {Session} from 'services/session';

export class RequestPayment {
  @bindable approvalUrl = '';
  @bindable listing;
  value;
  isChargingControllingInterestFees = false;

  static inject = [DialogController, WalletsService, NetworkFeesService, ExchangeRatesService, Session];
  constructor(dialogController, walletsService, networkFeesService, exchangeRatesService, session) {
    this.controller = dialogController;
    this.walletsService = walletsService;
    this.networkFeesService = networkFeesService;
    this.exchangeRatesService = exchangeRatesService;
    this.session = session;
  }
  activate(listing) {
    this.listing = listing;
    let balance = this.listing.address.available_balance;

    let networkFeesPromise = this.networkFeesService.getNetworkFees(balance, listing.address.address).then(result => {
      this.networkFees = result.estimated_network_fee;
    });
    let exchangeRatesPromise = this.exchangeRatesService.getExchangeRate().then(result => {
      this.exchangeRate = result;
    });
    return Promise.all([networkFeesPromise, exchangeRatesPromise]).then(() => {
      this.calculateValues();
    });
  }
  calculateValues() {
    let totalAmountInCurrency = this.listing.address.available_balance * this.exchangeRate;
    let networkFeesInCurrency = (this.networkFees * this.exchangeRate);
    let totalLessNetworkFees = (totalAmountInCurrency - networkFeesInCurrency);
    let controllingInterestFees;
    let remainder;

    if (this.isChargingControllingInterestFees) {
      controllingInterestFees = (totalLessNetworkFees * .1);
      remainder = (totalLessNetworkFees - this.controllingInterestFees);
    } else {
      remainder = totalLessNetworkFees;
    }

    let data = {
      networkFeesInCurrency: networkFeesInCurrency,
      controllingInterestFees: controllingInterestFees,
      remainder: remainder,
      total: totalAmountInCurrency
    };

    this.value = new PaymentRequestInCurrency(data);
  }
  request() {
    let listing = this.listing;
    let approvalUrl = this.approvalUrl;
    let amount = (listing.address.available_balance - this.networkFees);

    return this.walletsService.requestFromListing(amount, approvalUrl, listing).then(result => {
      return this.controller.ok(listing);
    });
  }
}

export class PaymentRequestInCurrency {
  networkFeesInCurrency;
  controllingInterestFees;
  remainder;
  total;

  constructor(data) {
    Object.assign(this, data);
  }
}
