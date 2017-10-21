import {Session} from 'services/session';
import {Link} from 'models/index';
import {HttpWrapper} from 'services/http-wrapper';

export class LinksService {
  static inject  = [Session, HttpWrapper];
  constructor(session, httpWrapper) {
    this.session = session;
    this.http = httpWrapper;
  }
  save(link) {
    let url = '';
    let verb;
    if (link.isNew) {
      url += 'links.json';
      verb = 'post';
    } else {
      url += `links/${link.id}.json`;
      verb = 'put';
    }
    return this.http[verb](url, link).then(result => {
      console.log('Saved');
    });
  }
}
