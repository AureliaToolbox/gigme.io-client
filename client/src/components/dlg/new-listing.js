import { DialogController } from 'aurelia-dialog';
import { Listing } from 'models/listing';

export class AddListingDialog {

  static inject = [DialogController]

  /**
   * @param {DialogController} controller
   */
  constructor(controller) {
    this.controller = controller;
  }

  activate(model) {
    let newListing = new Listing();
    newListing.setCompany(model.company);

    this.newListing = newListing;
    this.listingTypes = model.listingTypes;
  }

  close() {
    this.controller.cancel();
  }

  add() {
    this.validate()
      .then(success => {
        if (success) {
          this.controller.ok(this.newListing);
          return;
        }
        alert('Invalid listing title or invalid listing type.');
      });
  }

  validate() {
    return Promise.resolve().then(() => {
      if (this.newListing.title.trim() && this.newListing.listing_type) {
        return true;
      }
      return false;
    });
  }
}
