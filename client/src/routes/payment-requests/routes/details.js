import {bindable} from 'aurelia-framework';
import {Datastore} from 'resources/datastore';
import {PaymentRequestsService} from 'services/payment-requests';
import {WalletsService} from 'services/wallets';
import {DialogService} from 'aurelia-dialog';
import {SendMoney} from 'components/send-money';
import {RequestPayment} from 'components/request-payment';

export class Details {
  @bindable paymentRequest;

  static inject = [Datastore, PaymentRequestsService, DialogService, WalletsService];
  constructor(datastore, paymentRequestsService, dialogsService, walletsService) {
    this.datastore = datastore;
    this.paymentRequestsService = paymentRequestsService;
    this.dialogsService = dialogsService;
    this.walletsService = walletsService;
  }

  activate(params) {
    let paymentRequestId = params.id;
    this.paymentRequest = this.findPaymentRequestById(paymentRequestId);

    if (!this.paymentRequest) {
      return this.paymentRequestsService.getPaymentRequestById(paymentRequestId).then(paymentRequest => {
        this.paymentRequest = paymentRequest;
        this.datastore.addPaymentRequest(paymentRequest);
      });
    }
  }

  findPaymentRequestById(id) {
    let match = this.datastore.paymentRequests.filter(paymentRequest => {
      return paymentRequest.id.toString() === id.toString();
    })[0];
    return match;
  }

  getAddress() {
    return this.walletsService.getAddress(this.paymentRequest.address).then(result => {
      if (!result || !result.total_value) {
        this.hasNoWallet = true;
      }
      this.paymentRequest.address.total_value = result.total_value;
      this.hasNoWallet = false;
    });
  }
  approve() {
    return this.paymentRequestsService.approve(this.paymentRequest).then(result => {
      Object.assign(this.paymentRequest, result);
      this.paymentRequest.completed = true;
      this.paymentRequest.id = this.paymentRequest.getId();
    }).catch(error => {
      alert('Error: Forbidden.  You are not allowed to approve this.');
    });
  }
  reject() {
    return this.paymentRequestsService.reject(this.paymentRequest).then(result => {
      Object.assign(this.paymentRequest, result);
      this.paymentRequest.completed = false;
      this.paymentRequest.rejected = true;
      this.paymentRequest.id = this.paymentRequest.getId();
    }).catch(error => {
      alert('Error: Forbidden.  You are not allowed to reject this.');
    });
  }
}
