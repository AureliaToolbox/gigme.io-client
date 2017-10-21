import {Session} from 'services/session';
import {UsersService} from 'services/users';
import {WalletsService} from 'services/wallets';
import {Link} from 'models/index';
import {Datastore} from 'resources/datastore';

export class Details {
  isEditing = false;

  static inject = [Session, UsersService, WalletsService, Datastore];
  constructor(session, usersService, walletsService, datastore) {
    this.session = session;
    this.usersService = usersService;
    this.walletsService = walletsService;
    this.datastore = datastore;
  }

  nameMatcher = (a, b) => {
    if (!a || !b) return;
    return a.name === b.name;
  }

  edit() {
    this.isEditing = true;
  }

  save() {
    let user = this.session.currentUser;
    this.usersService.save(user).then(result => {
      this.isEditing = false;
    });
  }

  addLink() {
    let user = this.session.currentUser;
    let link = new Link();
    link.isNew = true;
    link.user_id = user.id;
    user.addLink(link)
  }

  requestNewWallet() {
    return this.walletsService.requestNewUserWallet().then(newWallet => {
      return this.session.currentUser.setWallet(newWallet);
    });
  }
}
