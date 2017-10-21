import {bindable} from 'aurelia-framework';
import {HttpWrapper} from 'services/http-wrapper';
import {Session} from './services/session';

export class NavBar {
  @bindable router = null;
  signOut(){
    this.httpWrapper.delete('/users/sign_out').then(resp => {
      window.location.reload();
    });
  }
  static inject = [Session, HttpWrapper];
  constructor(session, httpWrapper) {
    this.session = session;
    this.httpWrapper = httpWrapper;
  }
}
