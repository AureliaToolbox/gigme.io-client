import {Address} from './address';

export class Wallet {
  id = '';
  label = '';
  total_value = 0.0;
  total_available_balance = 0.0;
  total_pending_received_balance = 0.0;
  network = '';
  addresses = [];

  constructor(data) {
    Object.assign(this, data);
    this.id = this.getId();
  }
  updateValues(data) {
    this.total_value = data.total_value;
    this.balance = data.total_value;
    this.available_balance = data.available_balance;
    this.pending_received_balance = data.pending_received_balance;
  }
  addAddress(address) {
    this.addresses.push(address);
  }
  getId() {
    return this._id.$oid;
  }
}
