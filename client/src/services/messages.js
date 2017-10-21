import {HttpWrapper} from 'services/http-wrapper';

export class MessagesService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }
  sendMessage(user, message) {
    let url = `/admin/users/${user.id}/messages.json`;
    let body = { message: message };
    return this.http.post(url, body).then(result => {
      return result.content;
    });
  }
  getFromMessages(user) {
    let url = `/admin/users/${user.id}/messages/from.json`;
    return this.http.get(url).then(result => {
      return result.content;
    });
  }
  getToMessages(user) {
    let url = `/admin/users/${user.id}/messages/to.json`;
    return this.http.get(url).then(result => {
      return result.content;
    });
  }
}
