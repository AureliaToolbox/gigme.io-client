export class Link {
  id = '';
  title = '';
  body = '';
  user_id = '';
  url = '';
  isNew = false;
  constructor(data) {
    Object.assign(this, data);
    if (this._id) {
      this.id = this.getId();
    }
  }
  getId() {
    return this._id.$oid;
  }
}
