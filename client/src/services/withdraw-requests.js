import {Session} from 'services/session';
import {WithdrawRequest} from 'models/index';
import {HttpWrapper} from 'services/http-wrapper';

export class WithdrawRequestsService {
  static inject  = [Session, HttpWrapper];
  constructor(session, httpWrapper) {
    this.session = session;
    this.http = httpWrapper;
  }
  getAll() {
    let url = `/withdraw_requests.json`;
    return this.http.get(url).then(result => {
      let withdrawRequests = [];
      result.content.forEach(withdrawRequest => {
        withdrawRequests.push(new WithdrawRequest(withdrawRequest));
      });
      return withdrawRequests;
    });
  }
  getForUser(user) {
    let url = `/admin/users/${user.id}/withdraw_requests.json`;
    return this.http.get(url).then(result => {
      let withdrawRequests = [];
      result.content.forEach(withdrawRequest => {
        withdrawRequests.push(new WithdrawRequest(withdrawRequest));
      });
      return withdrawRequests;
    });
  }
  getWithdrawRequestById(id) {
    return this.http.get(`/withdraw_requests/${id}.json`).then(result => {
      return new WithdrawRequest(result.content);
    });
  }
  approve(withdrawRequest) {
    let url = `/withdraw_requests/${withdrawRequest.id}/approve.json`;

    return this.http.patch(url, withdrawRequest).then(result => {
      console.log('Saved');
    });
  }
  reject(withdrawRequest) {
    alert('TODO: Create the endpoint on the server to reject')
    let url = `/withdraw_requests/${withdrawRequest.id}/reject.json`;

    return this.http.patch(url, withdrawRequest).then(result => {
      console.log('Saved');
    });
  }
}

function getId(obj) {
  return obj._id.$oid;
}
