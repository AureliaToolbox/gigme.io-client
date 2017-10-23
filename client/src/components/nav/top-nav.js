import {Session} from 'services/session';
import {bindable} from 'aurelia-framework';

export class TopNav {
  @bindable router;

  static inject = [Session];
  constructor(session) {
    this.session = session;
    this.active = false;
  }

  toggleMenu() {
      this.active = !this.active;
  }

  menuItemClick() {
      this.active = false;
      return true;
  }
}
