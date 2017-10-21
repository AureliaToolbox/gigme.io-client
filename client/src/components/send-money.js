import {bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {WalletsService} from 'services/wallets';
import {Session} from 'services/session';
import {ExchangeRatesService} from 'services/exchange-rates';

export class SendMoney {
  @bindable amount = 0;
  @bindable address;

  static inject = [DialogController, WalletsService, Session, ExchangeRatesService];
  constructor(dialogController, walletsService, session, exchangeRatesService) {
    this.controller = dialogController;
    this.walletsService = walletsService;
    this.session = session;
    this.exchangeRatesService = exchangeRatesService;
  }

  activate(address) {
    this.address = address;
  }
  attached() {
    return this.exchangeRatesService.getExchangeRate().then(result => {
      this.exchangeRate = result;
    });
  }
  send() {
    let address = this.address.address;

    return this.walletsService.sendToAddress(this.amount, address).then(result => {
      return this.controller.ok(this.address);
    });
  }
  amountChanged(newValue) {
    let displayValue = (newValue * this.exchangeRate);
    this.currentUsdValue = displayValue;
  }
}
