import {bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

export class ShowAddress {
  @bindable amount = 0;
  @bindable address;

  static inject = [DialogController];
  constructor(dialogController) {
    this.controller = dialogController;
  }
  activate(address) {
    this.address = address;
  }
  attached() {
    this.addressControl.select();
  }
}
