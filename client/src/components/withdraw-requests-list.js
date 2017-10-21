import {bindable} from 'aurelia-framework';
import {WithdrawRequestsService} from 'services/withdraw-requests';

export class WithdrawRequestsList {
  @bindable withdrawRequests = [];
  @bindable exchangeRates;

  static inject = [WithdrawRequestsService];
  constructor(withdrawRequestsService) {
    this.withdrawRequestsService = withdrawRequestsService;
  }
}
