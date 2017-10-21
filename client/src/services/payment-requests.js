import {Session} from 'services/session';
import {PaymentRequest} from 'models/index';
import {TemplatingEngine} from 'aurelia-framework';
import {HttpWrapper} from 'services/http-wrapper';

export class PaymentRequestsService {
  static inject  = [Session, TemplatingEngine, HttpWrapper];
  constructor(session, templatingEngine, httpWrapper) {
    this.session = session;
    this.http = httpWrapper;
  }
  getAll() {
    let url = `/payment_requests.json`;
    return this.http.get(url).then(result => {
      let paymentRequests = [];
      result.content.forEach(paymentRequest => {
        paymentRequests.push(new PaymentRequest(paymentRequest));
      });
      return paymentRequests;
    });
  }
  getForUser(user) {
    let url = `/admin/users/${user.id}/payment_requests.json`;
    return this.http.get(url).then(result => {
      let paymentRequests = [];
      result.content.forEach(paymentRequest => {
        paymentRequests.push(new PaymentRequest(paymentRequest));
      });
      return paymentRequests;
    });
  }
  getPaymentRequestById(id) {
    return this.http.get(`/payment_requests/${id}.json`).then(result => {
      return new PaymentRequest(result.content);
    });
  }
  approve(paymentRequest) {
    let url = `/payment_requests/${paymentRequest.id}/approve.json`;

    return this.http.patch(url, paymentRequest).then(result => {
      console.log('Saved');
    });
  }
  reject(paymentRequest) {
    alert('TODO: Create the endpoint on the server to reject')
    let url = `/payment_requests/${paymentRequest.id}/reject.json`;

    return this.http.patch(url, paymentRequest).then(result => {
      console.log('Saved');
    });
  }
}

function getId(obj) {
  return obj._id.$oid;
}
