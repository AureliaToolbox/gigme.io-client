import {bindable, containerless} from 'aurelia-framework';
import {Session} from 'services/session';
import {User} from 'models/user';
import {Company} from 'models/company';
import {Wallet} from 'models/wallet';

@containerless
export class UserDropdown {
  session;
  isOpen = false;

  static inject = [Session];
  constructor(session) {
    this.session = session;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
