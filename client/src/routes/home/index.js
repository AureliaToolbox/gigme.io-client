import {Router} from 'aurelia-router';
import {Session} from '../../services/session';
import {Datastore} from 'resources/datastore';

export class Index {
  static inject = [Router, Session, Datastore];
  constructor(router, session, datastore) {
    this.router = router;
    this.session = session;
    this.datastore = datastore;
    this.router.configure(config => {
      config.title = 'Aurelia';
      config.map([
        { route: ['','home'],  moduleId: './home',      nav: true, title:'Home' }
      ]);
    });
  }
}

class User {
  constructor(username, uid, image) {
    this.username = username;
    this.uid = uid;
    this.image = image;
  }
}
