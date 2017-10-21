import {Link} from './link';

export class User {
  id = '';
  name = '';
  image = '';
  availability;
  availability_id;
  listing_type;
  listing_type_id;
  experience_level;
  experience_level_id;
  rating;
  username = '';
  created_at;
  company;
  company_id;
  wallet;
  wallet_id;
  links = [];
  payment_requests = [];

  constructor(data) {
    let tempLinks = [];
    if (data.links) {
      data.links.forEach(link => {
        let newLink = new Link(link);
        tempLinks.push(newLink);
      });
      data.links = tempLinks;
    }
    Object.assign(this, data);
    if (this._id) {
      this.id = this.getId();
    }
  }

  getId() {
    return this._id.$oid;
  }
  addLink(link) {
    this.links.push(link);
  }
  setCompany(company) {
    this.company = company;
    this.company_id = company.id;
  }
  setWallet(wallet) {
    this.wallet = wallet;
    this.wallet_id = wallet.id;
  }
}
