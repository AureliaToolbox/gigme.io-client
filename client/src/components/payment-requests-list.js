import {bindable} from 'aurelia-framework';
import {PaymentRequestsService} from 'services/payment-requests';

export class PaymentRequestsList {
  @bindable paymentRequests = [];
  @bindable exchangeRates;

  static inject = [PaymentRequestsService];
  constructor(paymentRequestsService) {
    this.paymentRequestsService = paymentRequestsService;
  }
}
