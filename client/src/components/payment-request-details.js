import {PaymentRequest} from 'models/payment-request';
import {PaymentRequestsService} from 'services/payment-requests';
import {ExchangeRatesService} from 'services/exchange-rates';
import {bindable} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';

export class PaymentRequestDetails {
  @bindable title = '';
  @bindable paymentRequest;
  isAddingPaymentRequest = false;

  static inject = [PaymentRequestsService, DialogService, ExchangeRatesService];
  constructor(paymentRequestsService, dialogsService, exchangeRatesService) {
    this.paymentRequestsService = paymentRequestsService;
    this.dialogsService = dialogsService;
    this.exchangeRatesService = exchangeRatesService;
  }
  attached() {
    return this.exchangeRatesService.getExchangeRate().then(result => {
      this.exchangeRate = result;
      this.calculateValues();
    });
  }
  activate(paymentRequest) {
    this.paymentRequest = paymentRequest;
  }
  calculateValues() {
    let totalAmountInCurrency = this.paymentRequest.amount * this.exchangeRate;
    let data = {
      total: totalAmountInCurrency
    };

    this.value = new PaymentRequestInCurrency(data);
  }
  approve() {
    return this.paymentRequestsService.approve(this.paymentRequest).then(result => {
      Object.assign(this.paymentRequest, result);
      this.paymentRequest.id = this.paymentRequest.getId();
    });
  }
  cancel() {
    this.isAddingPaymentRequest = false;
  }
}

export class PaymentRequestInCurrency {
  total;
  constructor(data) {
    Object.assign(this, data);
  }
}
