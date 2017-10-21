import {PaymentRequestsService} from 'services/payment-requests';
import {WithdrawRequestsService} from 'services/withdraw-requests';
import {ExchangeRatesService} from 'services/exchange-rates';
import {Datastore} from 'resources/datastore';

export class Index {
  paymentRequests = [];
  companies = [];
  currentExchangeRate = 0;

  static inject = [Datastore, PaymentRequestsService, WithdrawRequestsService, ExchangeRatesService];
  constructor(datastore, paymentRequestsService, withdrawRequestsService, exchangeRatesService) {
    this.paymentRequestsService = paymentRequestsService;
    this.withdrawRequestsService = withdrawRequestsService;
    this.datastore = datastore;
    this.exchangeRatesService = exchangeRatesService;
  }

  activate() {
    let exchangeRatesPromise = this.exchangeRatesService.getExchangeRate().then(result => {
      this.currentExchangeRate = result;
    });
    let paymentRequestsPromise = this.paymentRequestsService.getAll().then(result => {
      this.paymentRequests = result;
    });
    let withdrawRequestsPromise = this.withdrawRequestsService.getAll().then(result => {
      this.withdrawRequests = result;
    });
    return Promise.all([exchangeRatesPromise, paymentRequestsPromise]);
  }
}
