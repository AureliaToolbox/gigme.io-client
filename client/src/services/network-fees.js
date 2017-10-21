import {HttpWrapper} from 'services/http-wrapper';

export class NetworkFeesService {
  static inject  = [HttpWrapper];
  constructor(httpWrapper) {
    this.http = httpWrapper;
  }
  getNetworkFees(amount, toAddress) {
    let data = { amount: amount, address: toAddress };
    let url = `/accounts/get_network_fees`;

    return this.http.post(url, data).then(result => {
      return result.content.data;
    });
  }
}
