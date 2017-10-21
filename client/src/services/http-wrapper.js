import {HttpClient} from 'aurelia-http-client';
import {Session} from 'services/session';

export class HttpWrapper {
  static inject  = [Session, HttpClient];
  constructor(session, httpClient) {
    this.session = session;
    this.httpClient = httpClient.configure(x => {
      x.withHeader('X-CSRF-Token', this.session.csrfToken);
    });
  }
  get(url) {
    return this.httpClient.get(url);
  }
  post(url, body) {
    return this.httpClient.post(url, body);
  }
  patch(url, body) {
    return this.httpClient.patch(url, body);
  }
  put(url, body) {
    return this.httpClient.put(url, body);
  }
  delete(url) {
    return this.httpClient.delete(url);
  }
}
