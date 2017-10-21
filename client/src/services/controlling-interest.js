import {Wallet} from 'models/index';
import {HttpWrapper} from 'services/http-wrapper';
import {WalletsService} from 'services/wallets';

export class ControllingInterestService {
  static inject  = [HttpWrapper];
  constructor(httpWrapper) {
    this.http = httpWrapper;
  }
  getControllingInterest() {
    let url = `/accounts/get_controlling_interest`;
    return this.http.get(url).then(result => {
      return result.content;
    });
  }
}
