import {Session} from 'services/session';
import {bindable} from 'aurelia-framework';

export class LeftNav {
  @bindable router;

  static inject = [Session];
  constructor(session) {
    this.session = session;
  }
}
