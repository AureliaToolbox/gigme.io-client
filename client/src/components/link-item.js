import {bindable} from 'aurelia-framework';
import {LinksService} from 'services/links';

export class LinkItem {
  @bindable link;
  @bindable isEditing = false;

  static inject = [LinksService];
  constructor(linksService) {
    this.linksService = linksService;
  }
  attached() {
    if (this.link.isNew) {
      this.isEditing = true;
    }
  }
  edit() {
    this.isEditing = true;
  }
  save() {
    this.linksService.save(this.link).then(result => {
      this.isEditing = false;
    });
  }
  isEditingChanged(newValue) {
    console.log(newValue)
  }
}
