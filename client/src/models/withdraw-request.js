export class WithdrawRequest {
  amount;
  to_address = '';
  completed;

  user;
  user_id;

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
