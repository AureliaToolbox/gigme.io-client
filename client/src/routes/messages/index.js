import {Message} from 'models/message';
import {bindable} from 'aurelia-framework';
import {MessagesService} from 'services/messages';
import {Session} from 'services/session';
import {Datastore} from 'resources/datastore';

export class Index {
  @bindable fromMessages = [];
  @bindable toMessages = [];

  static inject = [MessagesService, Session, Datastore];
  constructor(messagesService, session, datastore) {
    this.messagesService = messagesService;
    this.session = session;
    this.datastore = datastore;
  }
  attached() {
    let user = this.session.currentUser;
    if (user) {
      let fromPromise = this.messagesService.getFromMessages(user).then(messages => {
        this.fromMessages = messages;
      });
      let toPromise = this.messagesService.getToMessages(user).then(messages => {
        this.toMessages = messages;
      });
      return Promise.all([toPromise, fromPromise]);
    }
  }
}
