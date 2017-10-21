import {Datastore} from 'resources/datastore';

export class WorkDetails {
  user;
  datastore;
  nameMatcher = (a, b) => {
    if (!a || !b) return;
    return a.name === b.name;
  }
  static inject = [Datastore];
  constructor(datastore) {
    this.datastore = datastore;
  }
  activate(user) {
    this.user = user;
  }
}
