import {bindable} from 'aurelia-framework';
import {Datastore} from 'resources/datastore';
import {WithdrawRequestsService} from 'services/withdraw-requests';

export class Details {
  @bindable withdrawRequest;

  static inject = [Datastore, WithdrawRequestsService];
  constructor(datastore, withdrawRequestsService) {
    this.datastore = datastore;
    this.withdrawRequestsService = withdrawRequestsService;
  }

  activate(params) {
    let withdrawRequestId = params.id;
    this.withdrawRequest = this.findWithdrawRequestById(withdrawRequestId);
    console.log(this.withdrawRequest)

    if (!this.withdrawRequest) {
      return this.withdrawRequestsService.getWithdrawRequestById(withdrawRequestId).then(withdrawRequest => {
        this.withdrawRequest = withdrawRequest;
        console.log(this.withdrawRequest)
        this.datastore.addWithdrawRequest(withdrawRequest);
      });
    }
  }

  findWithdrawRequestById(id) {
    let match = this.datastore.withdrawRequests.filter(withdrawRequest => {
      return withdrawRequest.id.toString() === id.toString();
    })[0];
    return match;
  }

  approve() {
    return this.withdrawRequestsService.approve(this.withdrawRequest).then(result => {
      Object.assign(this.withdrawRequest, result);
      this.withdrawRequest.completed = true;
      this.withdrawRequest.id = this.withdrawRequest.getId();
    }).catch(error => {
      alert('Error: Forbidden.  You are not allowed to approve this.');
    });
  }

  reject() {
    return this.withdrawRequestsService.reject(this.withdrawRequest).then(result => {
      Object.assign(this.withdrawRequest, result);
      this.withdrawRequest.completed = false;
      this.withdrawRequest.rejected = true;
      this.withdrawRequest.id = this.withdrawRequest.getId();
    }).catch(error => {
      alert('Error: Forbidden.  You are not allowed to reject this.');
    });
  }
}
