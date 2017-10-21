import {Wallet} from './wallet';

export class Address {
  id = '';
  address = '';
  label = '';
  total_value = 0.0;
  available_balance = 0.0;
  pending_received_balance = 0.0;
  network = '';
  archived = false;

  constructor(data) {
    Object.assign(this, data);
  }
  updateValues(data) {
    this.total_value = data.total_value;
    this.balance = data.total_value;
    this.available_balance = data.available_balance;
    this.pending_received_balance = data.pending_received_balance;
  }
}
