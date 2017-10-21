import {inject, bindable, computedFrom} from 'aurelia-framework';
import {DataContext} from '../../services/datacontext';
import {Session} from '../../services/session';

@inject(DataContext, Session)
export class Home{
  allCards = [];
  newCards = [];
  votedCards = [];
  recentCards = [];
  constructor(datacontext, session){
    this.datacontext = datacontext;
    this.session = session;
  }
  like(card){
    if (!card.liked){
      this.datacontext.likeCard(card).then(resp => {
        var newLike = JSON.parse(resp.response).like;
        card.likes.push(newLike)
      });
    }
  }
  activate(){
    var self = this;
    return this.datacontext.getNewsItems().then(resp => {
      JSON.parse(resp.response).forEach(card => {
        var newCard = new Card(card, this.session.currentUser);
        self.allCards.push(newCard);
      });
      self.newCards = self.allCards.sort(sortByDate).slice(0,5);
      self.votedCards = self.allCards.sort(sortByLikes).slice(0,5);
    });
  }
}

function sortByDate (a, b) {return a.posted - b.posted}
function sortByLikes (a, b) {return b.likes.length - a.likes.length}

class Card {
  constructor(card, user){
    this.user = user;
    this._id = card._id
    this.name = card.name;
    this.author = card.author;
    this.link = card.link;
    this.posted = new Date(card.posted);
    this.news_contents = card.news_contents;
    this.views = card.views;
    this.likes = [];
    if (card.likes){
      card.likes.forEach(like => {
        this.likes.push(like)
      });
    }
    this.open = false;
  }
  toggleOpen(){
    this.open = !this.open;
  }
  @computedFrom('likes')
  get liked(){
    var matches = this.likes.filter(like => {
      return like.user_id === this.user.uid;
    });
    return matches.length !== 0;
  }
}
