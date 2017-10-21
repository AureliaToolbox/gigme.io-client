import {bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {MessagesService} from 'services/messages';
import {Message} from 'models/message';

export class MessageUser {
  @bindable user;
  @bindable message = new Message();

  static inject = [DialogController, MessagesService];
  constructor(dialogController, messagesService) {
    this.controller = dialogController;
    this.messagesService = messagesService;
    this.message.body = "Hi, I'd like to contact you about an opportunity for my company.  I am not a recruiter";
  }
  activate(user) {
    this.user = user;
    this.message.to_user_id = this.user.id;
  }
  sendMessage() {
    this.messagesService.sendMessage(this.user, this.message).then(result => {
      console.log(result);
    });
    this.controller.ok(this.user);
  }
}
