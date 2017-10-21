import {bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

export class ShowAllAddresses {
  @bindable wallet;

  static inject = [DialogController];
  constructor(dialogController) {
    this.controller = dialogController;
  }
  activate(wallet) {
    this.wallet = wallet;
  }
}
