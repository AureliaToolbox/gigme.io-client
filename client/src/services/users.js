import {Session} from 'services/session';
import {User} from 'models/index';
import {TemplatingEngine} from 'aurelia-framework';
import {HttpWrapper} from 'services/http-wrapper';

export class UsersService {
  static inject  = [Session, TemplatingEngine, HttpWrapper];
  constructor(session, templatingEngine, httpWrapper) {
    this.session = session;
    this.http = httpWrapper;
    let dropdown = document.querySelector('user-dropdown');
    let otherDeadContent = document.querySelector('user-dropdown + li');
    if (dropdown) {
      templatingEngine.enhance(dropdown);
      otherDeadContent.style.display = 'none';
    }
  }
  getAll() {
    let url = `/admin/users.json`;

    return this.http.get(url).then(result => {
      let users = [];
      result.content.forEach(user => {
        users.push(new User(user));
      });
      return users;
    });
  }
  getCurrentUser() {
    let url = `/admin/users/get_current_user.json`;

    return this.http.get(url).then(result => {
      return result.content;
    });
  }
  getPrimeData() {
    let url = `/admin/users/get_prime_data.json`;

    return this.http.get(url).then(result => {
      return result.content;
    });
  }
  save(user) {
    if (user.availability) {
      user.availability_id = getId(user.availability);
    }
    if (user.experience_level) {
      user.experience_level_id = getId(user.experience_level);
    }
    let url = `/admin/users/${user.id}.json`;
    return this.http.patch(url, user).then(result => {
      return result.content;
    });
  }
}

function getId(obj) {
  return obj._id.$oid;
}
