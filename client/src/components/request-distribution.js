import {bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {WalletsService} from 'services/wallets';
import {NetworkFeesService} from 'services/network-fees';
import {ExchangeRatesService} from 'services/exchange-rates';
import {Session} from 'services/session';

export class RequestDistribution {
  @bindable wallet;
  value;
  toAddress;
  isChargingControllingInterestFees = false;

  static inject = [DialogController, WalletsService, NetworkFeesService, ExchangeRatesService, Session];
  constructor(dialogController, walletsService, networkFeesService, exchangeRatesService, session) {
    this.controller = dialogController;
    this.walletsService = walletsService;
    this.networkFeesService = networkFeesService;
    this.exchangeRatesService = exchangeRatesService;
    this.session = session;
  }
  activate(wallet) {
    this.wallet = wallet;
    let address = this.session.currentUser.wallet.addresses[0];
    let balance = (parseFloat(this.wallet.total_available_balance) - .001);

    let networkFeesPromise = this.networkFeesService.getNetworkFees(balance, address.address).then(result => {
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
    let networkFeesInCurrency = (this.networkFees * this.exchangeRate);

    let data = {
      networkFeesInCurrency: networkFeesInCurrency,
      total: (this.wallet.total_value - networkFeesInCurrency)
    };

    this.value = new PaymentRequestInCurrency(data);
  }
  request() {
    let wallet = this.wallet;
    let toAddress = this.toAddress;
    let amount = (this.wallet.total_available_balance - this.networkFees);

    return this.walletsService.requestDistribution(amount, toAddress).then(result => {
      return this.controller.ok(this.wallet);
    });
  }
}

export class PaymentRequestInCurrency {
  networkFeesInCurrency;
  total;
  constructor(data) {
    Object.assign(this, data);
  }
}
