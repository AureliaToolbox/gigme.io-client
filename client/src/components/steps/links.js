import {Link} from 'models/link';

export class Links {
  user;
  activate(user) {
    this.user = user;
  }
  addLink() {
    let link = new Link();
    link.isNew = true;
    link.user_id = this.user.id;
    this.user.addLink(link);
  }
}
