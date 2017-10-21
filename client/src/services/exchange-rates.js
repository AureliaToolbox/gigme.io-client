import {HttpWrapper} from 'services/http-wrapper';

export class ExchangeRatesService {
  static inject  = [HttpWrapper];
  constructor(httpWrapper) {
    this.http = httpWrapper;
  }
  getExchangeRate() {
    let url = `/accounts/get_exchange_rate`;
    return this.http.get(url).then(result => {
      return result.content;
    });
  }
}
