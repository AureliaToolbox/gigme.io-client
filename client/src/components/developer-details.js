import {bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Session} from 'services/session';

export class DeveloperDetails {
  @bindable developer;

  static inject = [DialogController, Session];
  constructor(dialogController, session) {
    this.controller = dialogController;
    this.session = session;
  }
  activate(developer) {
    this.developer = developer;
  }
  sendMessage() {
    this.controller.ok(this.developer);
  }
}
