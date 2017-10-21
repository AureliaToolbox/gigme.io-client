export class Company {
  id = '';
  name = '';
  website = '';
  main_contact_id = '';
  wallet;
  wallet_id;

  constructor(data) {
    Object.assign(this, data);
    if (this._id) {
      this.id = this.getId();
    }
  }
  getId() {
    return this._id.$oid;
  }
  setWallet(wallet) {
    this.wallet = wallet;
    this.wallet_id = wallet.id;
  }
}
